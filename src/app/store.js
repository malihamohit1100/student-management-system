
import { configureStore } from '@reduxjs/toolkit';

import studentsReducer from '../features/students/studentsSlice';

import {
  saveStudents,
  saveActivities,
  saveUnreadStatus,
} from '../utils/storage';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

let previousState = store.getState().students;

store.subscribe(() => {
  const currentState = store.getState().students;

  if (currentState.students !== previousState.students) {
    saveStudents(currentState.students);
  }

  if (currentState.activities !== previousState.activities) {
    saveActivities(currentState.activities);
  }

  if (
    currentState.hasUnreadActivities !==
    previousState.hasUnreadActivities
  ) {
    saveUnreadStatus(currentState.hasUnreadActivities);
  }

  previousState = currentState;
});
