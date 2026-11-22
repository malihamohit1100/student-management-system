
const STORAGE_KEY = 'student-management-students';

export const loadStudents = () => {
  try {
    const savedStudents = localStorage.getItem(STORAGE_KEY);

    if (!savedStudents) {
      return [];
    }

    const parsedStudents = JSON.parse(savedStudents);

    return Array.isArray(parsedStudents) ? parsedStudents : [];
  } catch (error) {
    console.error('Failed to load students:', error);
    return [];
  }
};

export const saveStudents = (students) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(students)
    );
  } catch (error) {
    console.error('Failed to save students:', error);
  }
};
