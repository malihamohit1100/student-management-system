
export const validateStudent = (student) => {
  const errors = {};

  const name = student.name.trim();
  const email = student.email.trim();
  const phone = student.phone.trim();
  const department = student.department.trim();

  // Name validation
  if (!name) {
    errors.name = 'Student name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must contain at least 2 characters.';
  } else if (name.length > 60) {
    errors.name = 'Name cannot exceed 60 characters.';
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Phone validation
  const phonePattern = /^\+?[\d\s()-]+$/;
  const digitsOnly = phone.replace(/\D/g, '');

  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (
    !phonePattern.test(phone) ||
    digitsOnly.length < 7 ||
    digitsOnly.length > 15
  ) {
    errors.phone = 'Please enter a valid phone number.';
  }

  // Department validation
  if (!department) {
    errors.department = 'Please select a department.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
