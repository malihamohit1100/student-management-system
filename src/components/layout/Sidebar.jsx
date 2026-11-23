
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Settings,
  BookOpen,
  PanelLeftClose,
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r border-white/10 bg-[#251E2C]
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C3B1E1] text-[#19141E]">
              <GraduationCap size={23} />
            </div>

            <div>
              <h1 className="text-base font-bold text-[#F4EFEA]">
                EduManage
              </h1>
              <p className="text-xs text-[#F4EFEA]/45">
                Student Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#F4EFEA]/60 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeftClose size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-7">
          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F4EFEA]/35">
            Workspace
          </p>

          <nav className="space-y-2">
            <a
              href="#dashboard"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl bg-[#C3B1E1]/15 px-4 py-3 text-sm font-medium text-[#C3B1E1]"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            <a
              href="#students"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#F4EFEA]/65 transition hover:bg-white/5 hover:text-[#F4EFEA]"
            >
              <Users size={19} />
              Students
            </a>

            <a
              href="#departments"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#F4EFEA]/65 transition hover:bg-white/5 hover:text-[#F4EFEA]"
            >
              <BookOpen size={19} />
              Departments
            </a>

            <a
              href="#settings"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#F4EFEA]/65 transition hover:bg-white/5 hover:text-[#F4EFEA]"
            >
              <Settings size={19} />
              Settings
            </a>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 p-5">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9A79C]/20 text-sm font-bold text-[#D9A79C]">
              SM
            </div>

            <div>
              <p className="text-sm font-medium text-[#F4EFEA]">
                Student Admin
              </p>
              <p className="text-xs text-[#F4EFEA]/40">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
