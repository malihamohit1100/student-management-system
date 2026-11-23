
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { loadStudents } from '../../utils/storage';

const initialState = {
  students: loadStudents(),
  searchTerm: '',
  error: null,
  activities: [],
};

const addActivity = (state, activity) => {
  state.activities.unshift({
    ...activity,
  });

  // Keep only the 10 most recent activities.
  state.activities = state.activities.slice(0, 10);
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
        const name = student.name.trim();

        return {
          payload: {
            student: {
              ...student,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
            activity: {
              id: crypto.randomUUID(),
              type: 'added',
              studentName: name,
              createdAt: new Date().toISOString(),
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
        return {
          payload: {
            id,
            updatedData,
            activity: {
              id: crypto.randomUUID(),
              type: 'edited',
              studentName: updatedData.name.trim(),
              createdAt: new Date().toISOString(),
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
      state.error = null;
      state.searchTerm = '';
    },

    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
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
  clearError,
} = studentsSlice.actions;

export const selectStudents = (state) => state.students.students;
export const selectSearchTerm = (state) => state.students.searchTerm;
export const selectStudentError = (state) => state.students.error;
export const selectActivities = (state) => state.students.activities;

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
