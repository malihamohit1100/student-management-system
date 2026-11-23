
import { createSlice, createSelector } from '@reduxjs/toolkit';

import {
  loadStudents,
  loadActivities,
  loadUnreadStatus,
} from '../../utils/storage';

const initialState = {
  students: loadStudents(),
  searchTerm: '',
  error: null,
  activities: loadActivities(),
  hasUnreadActivities: loadUnreadStatus(),
};

const addActivity = (state, activity) => {
  state.activities.unshift(activity);
  state.activities = state.activities.slice(0, 20);
  state.hasUnreadActivities = true;
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,

  reducers: {
    addStudent: {
      reducer(state, action) {
        const { student, activity } = action.payload;

        const newEmail = student.email.toLowerCase().trim();

        const emailExists = state.students.some(
          (item) => item.email.toLowerCase().trim() === newEmail
        );

        if (emailExists) {
          state.error = 'A student with this email already exists.';
          return;
        }

        state.students.push(student);
        state.error = null;
        addActivity(state, activity);
      },

      prepare(student) {
        const now = new Date().toISOString();

        return {
          payload: {
            student: {
              ...student,
              id: crypto.randomUUID(),
              createdAt: now,
            },
            activity: {
              id: crypto.randomUUID(),
              type: 'added',
              studentName: student.name.trim(),
              createdAt: now,
            },
          },
        };
      },
    },

    editStudent: {
      reducer(state, action) {
        const { id, updatedData, activity } = action.payload;

        const newEmail = updatedData.email.toLowerCase().trim();

        const emailExists = state.students.some(
          (student) =>
            student.id !== id &&
            student.email.toLowerCase().trim() === newEmail
        );

        if (emailExists) {
          state.error = 'Another student already uses this email.';
          return;
        }

        const studentIndex = state.students.findIndex(
          (student) => student.id === id
        );

        if (studentIndex === -1) {
          state.error = 'Student not found.';
          return;
        }

        state.students[studentIndex] = {
          ...state.students[studentIndex],
          ...updatedData,
        };

        state.error = null;
        addActivity(state, activity);
      },

      prepare({ id, ...updatedData }) {
        const now = new Date().toISOString();

        return {
          payload: {
            id,
            updatedData,
            activity: {
              id: crypto.randomUUID(),
              type: 'edited',
              studentName: updatedData.name.trim(),
              createdAt: now,
            },
          },
        };
      },
    },

    deleteStudent: {
      reducer(state, action) {
        const { id, activity } = action.payload;

        const studentExists = state.students.some(
          (student) => student.id === id
        );

        if (!studentExists) return;

        state.students = state.students.filter(
          (student) => student.id !== id
        );

        state.error = null;
        addActivity(state, activity);
      },

      prepare(student) {
        const id = typeof student === 'string' ? student : student.id;
        const name = typeof student === 'string' ? '' : student.name;

        return {
          payload: {
            id,
            activity: {
              id: crypto.randomUUID(),
              type: 'deleted',
              studentName: name,
              createdAt: new Date().toISOString(),
            },
          },
        };
      },
    },

    clearAllStudents(state) {
      state.students = [];
      state.activities = [];
      state.hasUnreadActivities = false;
      state.error = null;
      state.searchTerm = '';
    },

    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    markActivitiesRead(state) {
      state.hasUnreadActivities = false;
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  addStudent,
  editStudent,
  deleteStudent,
  clearAllStudents,
  setSearchTerm,
  markActivitiesRead,
  clearError,
} = studentsSlice.actions;

export const selectStudents = (state) => state.students.students;
export const selectSearchTerm = (state) => state.students.searchTerm;
export const selectStudentError = (state) => state.students.error;
export const selectActivities = (state) => state.students.activities;
export const selectHasUnreadActivities = (state) =>
  state.students.hasUnreadActivities;

export const selectFilteredStudents = createSelector(
  [selectStudents, selectSearchTerm],
  (students, searchTerm) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return students;

    return students.filter((student) =>
      student.name.toLowerCase().includes(normalizedSearch)
    );
  }
);

export default studentsSlice.reducer;
