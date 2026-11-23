
import { useSelector } from 'react-redux';
import { Building2, Users } from 'lucide-react';
import { selectStudents } from '../studentsSlice';

const DepartmentOverview = () => {
  const students = useSelector(selectStudents);

  const departmentCounts = students.reduce((counts, student) => {
    const department = student.department.trim();

    if (department) {
      counts[department] = (counts[department] || 0) + 1;
    }

    return counts;
  }, {});

  const departments = Object.entries(departmentCounts).sort(
    ([first], [second]) => first.localeCompare(second)
  );

  return (
    <section>
      <div className="mb-7">
        <p className="text-sm text-[#A99EAF]">
          Department Overview
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-[#F4EFEA]">
          Departments
        </h2>
        <p className="mt-2 text-sm text-[#A99EAF]">
          View student distribution across departments.
        </p>
      </div>

      {departments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-[#251E2C] px-6 py-16 text-center">
          <Building2
            size={32}
            className="mx-auto mb-4 text-[#C3B1E1]"
          />
          <h3 className="text-base font-semibold text-[#F4EFEA]">
            No departments to display
          </h3>
          <p className="mt-2 text-sm text-[#A99EAF]">
            Add students to see their departments and student counts here.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {departments.map(([department, count]) => {
              const percentage = students.length
                ? Math.round((count / students.length) * 100)
                : 0;

              return (
                <div
                  key={department}
                  className="rounded-2xl border border-white/10 bg-[#251E2C] p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C3B1E1]/10 text-[#C3B1E1]">
                      <Building2 size={21} />
                    </div>

                    <span className="text-xs font-medium text-[#D9A79C]">
                      {percentage}%
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-[#F4EFEA]">
                    {department}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-[#A99EAF]">
                    <Users size={16} />
                    {count} {count === 1 ? 'student' : 'students'}
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#C3B1E1]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-[#8F8298]">
            Showing {departments.length} departments represented by registered students.
          </p>
        </>
      )}
    </section>
  );
};

export default DepartmentOverview;
