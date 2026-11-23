
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, UserPlus, Save } from 'lucide-react';
import { toast } from 'react-toastify';

import {
  addStudent,
  editStudent,
  selectStudents,
} from '../studentsSlice';

import { validateStudent } from '../../../utils/validation';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  department: '',
};

const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Business Administration',
  'English',
  'Economics',
  'Civil Engineering',
  'Mathematics',
  'Other',
];

const StudentForm = ({ student, onClose }) => {
  const dispatch = useDispatch();

  const students = useSelector(selectStudents);

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(student);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        department: student.department,
      });
    } else {
      setFormData(initialForm);
    }

    setErrors({});
  }, [student]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear the field error when the user edits it
    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      department: formData.department.trim(),
    };

    const validation = validateStudent(cleanedData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Prevent duplicate emails
    const emailExists = students.some(
      (existingStudent) =>
        existingStudent.email.toLowerCase().trim() ===
          cleanedData.email.toLowerCase() &&
        existingStudent.id !== student?.id
    );

    if (emailExists) {
      setErrors({
        email: 'This email is already registered.',
      });

      return;
    }

    if (isEditing) {
      dispatch(
        editStudent({
          id: student.id,
          ...cleanedData,
        })
      );

      toast.success('Student information updated successfully.');
    } else {
      dispatch(addStudent(cleanedData));

      toast.success('Student added successfully.');
    }

    onClose();
  };

  const inputClass = (field) => `
    w-full rounded-xl border bg-[#19141E] px-4 py-3
    text-sm text-[#F4EFEA] outline-none transition
    placeholder:text-[#F4EFEA]/25
    focus:border-[#C3B1E1]
    ${errors[field] ? 'border-red-400' : 'border-white/10'}
  `;

  const fields = [
    {
      name: 'name',
      label: 'Student Name',
      placeholder: 'Enter full name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email Address',
      placeholder: 'student@example.com',
      type: 'email',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      placeholder: '+880 1712 345678',
      type: 'tel',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-form-title"
        className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#251E2C] shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C3B1E1]/15 text-[#C3B1E1]">
              {isEditing ? <Save size={21} /> : <UserPlus size={21} />}
            </div>

            <div>
              <h2
                id="student-form-title"
                className="text-lg font-semibold text-[#F4EFEA]"
              >
                {isEditing ? 'Edit Student' : 'Add New Student'}
              </h2>

              <p className="text-xs text-[#F4EFEA]/45">
                {isEditing
                  ? 'Update student information'
                  : 'Enter the student details below'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#F4EFEA]/50 transition hover:bg-white/5 hover:text-white"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5 p-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-medium text-[#F4EFEA]/80"
                >
                  {field.label}
                  <span className="ml-1 text-[#D9A79C]">*</span>
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={inputClass(field.name)}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={
                    errors[field.name]
                      ? `${field.name}-error`
                      : undefined
                  }
                />

                {errors[field.name] && (
                  <p
                    id={`${field.name}-error`}
                    className="mt-1.5 text-xs text-red-400"
                  >
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="mb-2 block text-sm font-medium text-[#F4EFEA]/80"
              >
                Department
                <span className="ml-1 text-[#D9A79C]">*</span>
              </label>

              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={inputClass('department')}
                aria-invalid={Boolean(errors.department)}
              >
                <option value="" disabled>
                  Select department
                </option>

                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>

              {errors.department && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.department}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-[#F4EFEA]/70 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#C3B1E1] px-5 py-2.5 text-sm font-semibold text-[#19141E] transition hover:bg-[#D4C7EA]"
            >
              {isEditing ? <Save size={16} /> : <UserPlus size={16} />}

              {isEditing ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
