
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  X,
  BookOpen,
} from 'lucide-react';

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'students',
    label: 'Students',
    icon: Users,
  },
  {
    id: 'departments',
    label: 'Departments',
    icon: Building2,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  },
];

const Sidebar = ({
  activeSection,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const handleNavigation = (section) => {
    onNavigate(section);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 shrink-0 flex-col
          border-r border-white/10
          bg-[#251E2C]
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:sticky lg:top-0 lg:h-screen
          lg:translate-x-0
        `}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C3B1E1]/15 text-[#C3B1E1]">
              <GraduationCap size={23} />
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-wide text-[#F4EFEA]">
                StudentHub
              </h1>
              <p className="text-xs text-[#A99EAF]">
                Management System
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#A99EAF] hover:bg-white/5 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-7">
          <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8F8298]">
            Workspace
          </p>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    flex w-full items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-medium
                    transition-colors
                    ${
                      isActive
                        ? 'bg-[#C3B1E1]/15 text-[#D7C8EF]'
                        : 'text-[#A99EAF] hover:bg-white/5 hover:text-[#F4EFEA]'
                    }
                  `}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#C3B1E1]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="border-t border-white/10 p-5">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D9A79C]/15 text-[#D9A79C]">
              <BookOpen size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#F4EFEA]">
                Student Portal
              </p>
              <p className="text-[11px] text-[#A99EAF]">
                Academic management
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
