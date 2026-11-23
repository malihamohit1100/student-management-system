
import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Users,
  Building2,
  UserPlus,
  Clock3,
  ArrowRight,
} from 'lucide-react';

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import SettingsPanel from './components/layout/SettingsPanel';

import StudentForm from './features/students/components/StudentForm';
import StudentTable from './features/students/components/StudentTable';
import DepartmentOverview from './features/students/components/DepartmentOverview';

import ConfirmDialog from './components/ui/ConfirmDialog';

import {
  selectStudents,
  deleteStudent,
  clearAllStudents,
} from './features/students/studentsSlice';

const parseRoute = (path) => {
  const segments = path
    .replace(/^#\/?/, '')
    .split('/')
    .filter(Boolean);

  const validSections = [
    'dashboard',
    'students',
    'departments',
    'settings',
  ];

  const section = validSections.includes(segments[0])
    ? segments[0]
    : 'dashboard';

  return {
    section,
    action: segments[1] || null,
    studentId: segments[2] || null,
  };
};

const getInitialRoute = () => {
  return parseRoute(window.location.hash);
};

const App = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);

  const initialRoute = getInitialRoute();

  const [activeSection, setActiveSection] = useState(initialRoute.section);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(
    initialRoute.action === 'add' || initialRoute.action === 'edit'
  );

  const [editingStudent, setEditingStudent] = useState(null);

  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const syncRoute = () => {
      const route = getInitialRoute();

      setActiveSection(route.section);

      if (route.section === 'students' && route.action === 'add') {
        setEditingStudent(null);
        setIsFormOpen(true);
        return;
      }

      if (route.section === 'students' && route.action === 'edit') {
        const student = students.find(
          (item) => item.id === route.studentId
        );

        setEditingStudent(student || null);
        setIsFormOpen(Boolean(student));
        return;
      }

      setIsFormOpen(false);
      setEditingStudent(null);
    };

    if (!window.location.hash) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}#dashboard`
      );
    }

    syncRoute();

    window.addEventListener('hashchange', syncRoute);

    return () => {
      window.removeEventListener('hashchange', syncRoute);
    };
  }, [students]);

  const navigateTo = (path, replace = false) => {
    const normalizedPath = path.replace(/^#\/?/, '');
    const targetHash = `#${normalizedPath}`;

    if (window.location.hash !== targetHash) {
      if (replace) {
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}${window.location.search}${targetHash}`
        );
      } else {
        window.location.hash = normalizedPath;
      }
    }

    const route = parseRoute(normalizedPath);

    setActiveSection(route.section);

    if (route.section === 'students' && route.action === 'add') {
      setEditingStudent(null);
      setIsFormOpen(true);
    } else if (
      route.section === 'students' &&
      route.action === 'edit'
    ) {
      const student = students.find(
        (item) => item.id === route.studentId
      );

      setEditingStudent(student || null);
      setIsFormOpen(Boolean(student));
    } else {
      setIsFormOpen(false);
      setEditingStudent(null);
    }
  };

  const statistics = useMemo(() => {
    const departmentCount = new Set(
      students
        .map((student) => student.department.trim())
        .filter(Boolean)
    ).size;

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const recentStudents = students.filter((student) => {
      if (!student.createdAt) return false;

      return new Date(student.createdAt).getTime() >= sevenDaysAgo;
    }).length;

    return {
      totalStudents: students.length,
      totalDepartments: departmentCount,
      recentStudents,
    };
  }, [students]);

  const recentStudents = useMemo(() => {
    return [...students]
      .sort(
        (first, second) =>
          new Date(second.createdAt || 0) -
          new Date(first.createdAt || 0)
      )
      .slice(0, 5);
  }, [students]);

  const openAddStudent = () => {
    navigateTo('students/add');
  };

  const openEditStudent = (student) => {
    navigateTo(`students/edit/${student.id}`);
  };

  const closeStudentForm = () => {
    navigateTo('students', true);
  };

  const requestDeleteStudent = (student) => {
    const selectedStudent =
      typeof student === 'string'
        ? students.find((item) => item.id === student)
        : student;

    if (!selectedStudent) return;

    setConfirmAction({
      type: 'delete',
      student: selectedStudent,
    });
  };

  const requestClearAll = () => {
    if (students.length === 0) return;

    setConfirmAction({
      type: 'clearAll',
    });
  };

  const closeConfirmation = () => {
    setConfirmAction(null);
  };

  const handleConfirmAction = () => {
    if (!confirmAction) return;

    if (confirmAction.type === 'delete') {
      dispatch(
        deleteStudent({
          id: confirmAction.student.id,
          name: confirmAction.student.name,
        })
      );
    }

    if (confirmAction.type === 'clearAll') {
      dispatch(clearAllStudents());
    }

    setConfirmAction(null);
  };

  const renderDashboard = () => (
    <div className="space-y-8">

      {/* Welcome section */}
      <div>
        <p className="text-sm text-[#A99EAF]">
          Overview
        </p>

        <h2 className="mt-1 text-2xl font-semibold text-[#F4EFEA]">
          Welcome to StudentHub
        </h2>

        <p className="mt-2 text-sm text-[#A99EAF]">
          Keep track of your students and academic information.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <div className="group rounded-2xl border border-white/10 bg-[#251E2C] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C3B1E1]/40 hover:shadow-[0_12px_35px_rgba(195,177,225,0.10)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A99EAF]">
                Total Students
              </p>

              <p className="mt-3 text-3xl font-semibold text-[#F4EFEA]">
                {statistics.totalStudents}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C3B1E1]/15 text-[#C3B1E1] transition-transform duration-300 group-hover:scale-110">
              <Users size={23} />
            </div>
          </div>

          <p className="mt-4 text-xs text-[#8F8298]">
            Registered student records
          </p>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-[#251E2C] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C3B1E1]/40 hover:shadow-[0_12px_35px_rgba(195,177,225,0.10)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A99EAF]">
                Departments
              </p>

              <p className="mt-3 text-3xl font-semibold text-[#F4EFEA]">
                {statistics.totalDepartments}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D9A79C]/15 text-[#D9A79C] transition-transform duration-300 group-hover:scale-110">
              <Building2 size={23} />
            </div>
          </div>

          <p className="mt-4 text-xs text-[#8F8298]">
            Departments represented by students
          </p>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-[#251E2C] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C3B1E1]/40 hover:shadow-[0_12px_35px_rgba(195,177,225,0.10)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A99EAF]">
                Recently Added
              </p>

              <p className="mt-3 text-3xl font-semibold text-[#F4EFEA]">
                {statistics.recentStudents}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C3B1E1]/15 text-[#C3B1E1] transition-transform duration-300 group-hover:scale-110">
              <UserPlus size={23} />
            </div>
          </div>

          <p className="mt-4 text-xs text-[#8F8298]">
            Students added in the last 7 days
          </p>
        </div>
      </div>

      {/* Recent students */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#251E2C]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-5 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <Clock3 size={17} className="text-[#C3B1E1]" />
              <h3 className="text-base font-semibold text-[#F4EFEA]">
                Recent Students
              </h3>
            </div>

            <p className="mt-1 text-xs text-[#A99EAF]">
              Your latest registered students
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('students')}
            className="flex items-center gap-2 text-xs font-semibold text-[#C3B1E1] transition hover:text-[#D7C8EF]"
          >
            View all students
            <ArrowRight size={15} />
          </button>
        </div>

        {recentStudents.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Users
              size={28}
              className="mx-auto mb-3 text-[#8F8298]"
            />

            <p className="text-sm font-medium text-[#F4EFEA]">
              No students registered yet
            </p>

            <p className="mt-1 text-xs text-[#A99EAF]">
              Add your first student to get started.
            </p>

            <button
              type="button"
              onClick={openAddStudent}
              className="mt-5 rounded-xl bg-[#C3B1E1] px-4 py-2.5 text-sm font-semibold text-[#19141E] transition hover:bg-[#D7C8EF]"
            >
              Add Student
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs text-[#A99EAF]">
                  <th className="px-6 py-4 font-medium">Student</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                </tr>
              </thead>

              <tbody>
                {recentStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[#F4EFEA]">
                      {student.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-[#A99EAF]">
                      {student.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-[#A99EAF]">
                      {student.department}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();

      case 'students':
        return (
          <StudentTable
            onEdit={openEditStudent}
            onDelete={requestDeleteStudent}
          />
        );

      case 'departments':
        return <DepartmentOverview />;

      case 'settings':
        return <SettingsPanel onClearAll={requestClearAll} />;

      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#19141E]">

      {/* Sidebar stays mounted, regardless of active page */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={navigateTo}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="min-w-0 flex-1">

        <Header
          activeSection={activeSection}
          onMenuClick={() => setIsSidebarOpen(true)}
          onAddClick={openAddStudent}
        />

        <div className="mx-auto w-full max-w-[1600px] p-5 md:p-8">
          {renderActiveSection()}
        </div>

        <footer className="border-t border-white/10 px-5 py-5 text-center text-xs text-[#8F8298] md:px-8">
          StudentHub — Student Management System
        </footer>
      </main>

      {/* Add/Edit student modal */}
      {isFormOpen && (
        <StudentForm
          student={editingStudent}
          onClose={closeStudentForm}
        />
      )}

      {/* Delete/Clear confirmation */}
      <ConfirmDialog
        isOpen={Boolean(confirmAction)}
        title={
          confirmAction?.type === 'clearAll'
            ? 'Clear all student records?'
            : 'Delete this student?'
        }
        message={
          confirmAction?.type === 'clearAll'
            ? 'This will permanently remove all student records stored in this browser. This action cannot be undone.'
            : `Are you sure you want to delete ${confirmAction?.student?.name || 'this student'}? This action cannot be undone.`
        }
        confirmLabel={
          confirmAction?.type === 'clearAll'
            ? 'Clear all records'
            : 'Delete student'
        }
        onConfirm={handleConfirmAction}
        onCancel={closeConfirmation}
      />
    </div>
  );
};

export default App;
