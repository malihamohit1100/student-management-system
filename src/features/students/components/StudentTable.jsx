
import { useDispatch, useSelector } from 'react-redux';

import {
  Search,
  Pencil,
  Trash2,
  Users,
  X,
} from 'lucide-react';

import {
  selectFilteredStudents,
  selectSearchTerm,
  setSearchTerm,
} from '../studentsSlice';

const getInitials = (name) => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
};

const StudentTable = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();

  const students = useSelector(selectFilteredStudents);
  const searchTerm = useSelector(selectSearchTerm);

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const clearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  return (
    <section
      id="students"
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#251E2C]"
    >
      {/* Table Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <h3 className="text-lg font-semibold text-[#F4EFEA]">
            Student Directory
          </h3>

          <p className="mt-1 text-sm text-[#F4EFEA]/45">
            Manage and view all registered students
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F4EFEA]/35"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by student name..."
            aria-label="Search students by name"
            className="w-full rounded-xl border border-white/10 bg-[#19141E] py-3 pl-10 pr-10 text-sm text-[#F4EFEA] outline-none transition placeholder:text-[#F4EFEA]/30 focus:border-[#C3B1E1]"
          />

          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F4EFEA]/40 hover:text-white"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between px-5 py-3 sm:px-6">
        <p className="text-xs text-[#F4EFEA]/45">
          {searchTerm
            ? `${students.length} matching student${students.length !== 1 ? 's' : ''}`
            : `${students.length} student${students.length !== 1 ? 's' : ''} registered`}
        </p>
      </div>

      {/* Table */}
      {students.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-y border-white/10 bg-white/[0.025]">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#F4EFEA]/40">
                  Student
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#F4EFEA]/40">
                  Email
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#F4EFEA]/40">
                  Phone
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#F4EFEA]/40">
                  Department
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#F4EFEA]/40">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.06]">
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-white/[0.025]"
                >
                  {/* Student */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                          index % 2 === 0
                            ? 'bg-[#C3B1E1]/15 text-[#C3B1E1]'
                            : 'bg-[#D9A79C]/15 text-[#D9A79C]'
                        }`}
                      >
                        {getInitials(student.name)}
                      </div>

                      <span className="whitespace-nowrap text-sm font-medium text-[#F4EFEA]">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-[#F4EFEA]/60">
                    {student.email}
                  </td>

                  {/* Phone */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#F4EFEA]/60">
                    {student.phone}
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4">
                    <span className="inline-flex whitespace-nowrap rounded-lg border border-[#C3B1E1]/15 bg-[#C3B1E1]/10 px-3 py-1.5 text-xs font-medium text-[#C3B1E1]">
                      {student.department}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(student)}
                        aria-label={`Edit ${student.name}`}
                        title="Edit student"
                        className="rounded-lg p-2 text-[#C3B1E1] transition hover:bg-[#C3B1E1]/10"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => onDelete(student)}
                        aria-label={`Delete ${student.name}`}
                        title="Delete student"
                        className="rounded-lg p-2 text-[#D9A79C] transition hover:bg-[#D9A79C]/10"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C3B1E1]/10 text-[#C3B1E1]">
            {searchTerm ? <Search size={28} /> : <Users size={28} />}
          </div>

          <h4 className="mt-5 text-base font-semibold text-[#F4EFEA]">
            {searchTerm
              ? 'No matching students'
              : 'No students registered yet'}
          </h4>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#F4EFEA]/45">
            {searchTerm
              ? 'Try searching with a different name or clear your search.'
              : 'Start building your student directory by adding your first student.'}
          </p>

          {searchTerm && (
            <button
              onClick={clearSearch}
              className="mt-5 text-sm font-semibold text-[#C3B1E1] hover:text-[#D4C7EA]"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default StudentTable;
