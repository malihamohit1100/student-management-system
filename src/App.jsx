
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Users,
  GraduationCap,
  Layers3,
  UserPlus,
} from 'lucide-react';
import { toast } from 'react-toastify';

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

import StatCard from './components/ui/StatCard';
import ConfirmDialog from './components/ui/ConfirmDialog';

import StudentForm from './features/students/components/StudentForm';
import StudentTable from './features/students/components/StudentTable';

import {
  selectStudents,
  deleteStudent,
} from './features/students/studentsSlice';

function App() {
  const dispatch = useDispatch();

  const students = useSelector(selectStudents);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Calculate dashboard statistics
  const statistics = useMemo(() => {
    const departments = new Set(
      students.map((student) => student.department)
    );

    const recentStudents = students.filter((student) => {
      const createdAt = new Date(student.createdAt);

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      return (
        !Number.isNaN(createdAt.getTime()) &&
        createdAt >= sevenDaysAgo
      );
    });

    return {
      totalStudents: students.length,
      totalDepartments: departments.size,
      recentStudents: recentStudents.length,
    };
  }, [students]);

  // Open form for adding a student
  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  // Open form for editing a student
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  // Close student form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedStudent(null);
  };

  // Open delete confirmation
  const handleDeleteRequest = (student) => {
    setStudentToDelete(student);
  };

  // Confirm student deletion
  const handleConfirmDelete = () => {
    if (!studentToDelete) {
      return;
    }

    dispatch(deleteStudent(studentToDelete.id));

    toast.success('Student deleted successfully.');

    setStudentToDelete(null);
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setStudentToDelete(null);
  };

  return (
    <div
      id="dashboard"
      className="flex min-h-screen bg-[#19141E]"
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          onAddClick={handleAddStudent}
        />

        <div className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-6 lg:p-8">

          {/* Welcome Section */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-[#C3B1E1]">
                STUDENT ADMINISTRATION
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#F4EFEA] sm:text-3xl">
                Welcome to your dashboard
              </h1>

              <p className="mt-2 text-sm text-[#F4EFEA]/45">
                Manage your students and keep track of academic records.
              </p>
            </div>

            <p className="text-xs text-[#F4EFEA]/35">
              Your student directory at a glance
            </p>
          </section>

          {/* Statistics */}
          <section>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-[#F4EFEA]">
                Overview
              </h2>

              <p className="mt-1 text-xs text-[#F4EFEA]/40">
                Key student management statistics
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <StatCard
                title="Total Students"
                value={statistics.totalStudents}
                description="All registered students"
                icon={Users}
                accent="#C3B1E1"
              />

              <StatCard
                title="Departments"
                value={statistics.totalDepartments}
                description="Departments represented"
                icon={Layers3}
                accent="#D9A79C"
              />

              <StatCard
                title="Recently Added"
                value={statistics.recentStudents}
                description="Students added in the last 7 days"
                icon={GraduationCap}
                accent="#C3B1E1"
              />
            </div>
          </section>

          {/* Student Management */}
          <section>
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-semibold text-[#F4EFEA]">
                  Manage Students
                </h2>

                <p className="mt-1 text-xs text-[#F4EFEA]/40">
                  Add, update, search and manage student records.
                </p>
              </div>

              <button
                onClick={handleAddStudent}
                className="flex w-fit items-center gap-2 rounded-xl border border-[#C3B1E1]/20 bg-[#C3B1E1]/10 px-4 py-2.5 text-sm font-medium text-[#C3B1E1] transition hover:bg-[#C3B1E1]/20"
              >
                <UserPlus size={17} />
                Add New Student
              </button>
            </div>

            <StudentTable
              onEdit={handleEditStudent}
              onDelete={handleDeleteRequest}
            />
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-[#F4EFEA]/35">
              EduManage Student Portal · Built with React, Redux Toolkit and Tailwind CSS
            </p>
          </footer>
        </div>
      </main>

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <StudentForm
          student={selectedStudent}
          onClose={handleCloseForm}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(studentToDelete)}
        student={studentToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default App;
