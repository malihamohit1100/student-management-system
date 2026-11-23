
const STORAGE_KEY = 'student-management-students';
const ACTIVITY_KEY = 'student-management-activities';
const UNREAD_KEY = 'student-management-unread';

const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved === null ? fallback : JSON.parse(saved);
  } catch (error) {
    console.error(`Failed to read ${key}:`, error);
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
};

export const loadStudents = () => {
  const students = readStorage(STORAGE_KEY, []);
  return Array.isArray(students) ? students : [];
};

export const saveStudents = (students) => {
  writeStorage(STORAGE_KEY, students);
};

export const loadActivities = () => {
  const activities = readStorage(ACTIVITY_KEY, []);
  return Array.isArray(activities) ? activities : [];
};

export const saveActivities = (activities) => {
  writeStorage(ACTIVITY_KEY, activities);
};

export const loadUnreadStatus = () => {
  return readStorage(UNREAD_KEY, false) === true;
};

export const saveUnreadStatus = (hasUnread) => {
  writeStorage(UNREAD_KEY, hasUnread);
};
