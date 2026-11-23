
import { useSelector } from 'react-redux';
import {
  Database,
  Users,
  Trash2,
  Info,
  ShieldCheck,
} from 'lucide-react';

import { selectStudents } from '../../features/students/studentsSlice';

const SettingsPanel = ({ onClearAll }) => {
  const students = useSelector(selectStudents);

  return (
    <section>
      <div className="mb-7">
        <p className="text-sm text-[#A99EAF]">
          Application Preferences
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-[#F4EFEA]">
          Settings
        </h2>
        <p className="mt-2 text-sm text-[#A99EAF]">
          Application information and local data management.
        </p>
      </div>

      <div className="space-y-5">

        {/* Storage information */}
        <div className="rounded-2xl border border-white/10 bg-[#251E2C] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C3B1E1]/10 text-[#C3B1E1]">
              <Database size={20} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#F4EFEA]">
                Data Storage
              </h3>
              <p className="text-xs text-[#A99EAF]">
                Student records are stored in your browser.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="flex items-center gap-2 text-[#A99EAF]">
                <Users size={16} />
                <span className="text-xs">Stored students</span>
              </div>

              <p className="mt-2 text-2xl font-semibold text-[#F4EFEA]">
                {students.length}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <div className="flex items-center gap-2 text-[#A99EAF]">
                <ShieldCheck size={16} />
                <span className="text-xs">Storage method</span>
              </div>

              <p className="mt-2 text-base font-semibold text-[#F4EFEA]">
                LocalStorage
              </p>
            </div>
          </div>
        </div>

        {/* Data management */}
        <div className="rounded-2xl border border-white/10 bg-[#251E2C] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D9A79C]/10 text-[#D9A79C]">
              <Trash2 size={20} />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[#F4EFEA]">
                Data Management
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#A99EAF]">
                Remove all registered student records from this browser.
                This action cannot be undone.
              </p>

              <button
                type="button"
                onClick={onClearAll}
                disabled={students.length === 0}
                className="mt-5 rounded-xl border border-[#D9A79C]/30 px-4 py-2.5 text-sm font-semibold text-[#D9A79C] transition hover:bg-[#D9A79C]/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear all student records
              </button>
            </div>
          </div>
        </div>

        {/* Application information */}
        <div className="rounded-2xl border border-white/10 bg-[#251E2C] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Info size={20} className="text-[#C3B1E1]" />
            <h3 className="text-sm font-semibold text-[#F4EFEA]">
              About this application
            </h3>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[#A99EAF]">Application</span>
              <span className="text-[#F4EFEA]">
                Student Management System
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#A99EAF]">Version</span>
              <span className="text-[#F4EFEA]">1.0.0</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#A99EAF]">Frontend</span>
              <span className="text-[#F4EFEA]">React</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#A99EAF]">State management</span>
              <span className="text-[#F4EFEA]">Redux Toolkit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPanel;
