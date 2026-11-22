
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { loadStudents } from '../../utils/storage';

const initialState = {
  students: loadStudents(),
  searchTerm: '',
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,

  reducers: {
    // Add a new student
    addStudent: {
      reducer(state, action) {
        const newEmail = action.payload.email.toLowerCase().trim();

        const emailExists = state.students.some(
          (student) =>
            student.email.toLowerCase().trim() === newEmail
        );

        if (emailExists) {
          state.error = 'A student with this email already exists.';
          return;
        }

        state.students.push(action.payload);
        state.error = null;
      },

      prepare(student) {
        return {
          payload: {
            ...student,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
        };
      },
    },

    // Edit an existing student
    editStudent(state, action) {
      const { id, ...updatedData } = action.payload;

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
    },

    // Delete a student
    deleteStudent(state, action) {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );

      state.error = null;
    },

    // Update search term
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    // Clear Redux error
    clearError(state) {
      state.error = null;
    },
  },
});

// Export actions
export const {
  addStudent,
  editStudent,
  deleteStudent,
  setSearchTerm,
  clearError,
} = studentsSlice.actions;

// Selectors
export const selectStudents = (state) => state.students.students;

export const selectSearchTerm = (state) => state.students.searchTerm;

export const selectStudentError = (state) => state.students.error;

// Memoized selector for searching students
export const selectFilteredStudents = createSelector(
  [selectStudents, selectSearchTerm],
  (students, searchTerm) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return students;
    }

    return students.filter((student) =>
      student.name.toLowerCase().includes(normalizedSearch)
    );
  }
);

// Export reducer
export default studentsSlice.reducer;
