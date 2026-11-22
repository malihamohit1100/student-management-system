
import { configureStore } from '@reduxjs/toolkit';

import studentsReducer from '../features/students/studentsSlice';

import { saveStudents } from '../utils/storage';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

// Persist student data whenever the Redux store changes
store.subscribe(() => {
  const students = store.getState().students.students;

  saveStudents(students);
});
