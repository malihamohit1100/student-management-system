
import {
  Menu,
  Bell,
  Plus,
  Search,
} from 'lucide-react';

const Header = ({ onMenuClick, onAddClick }) => {
  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#F4EFEA]/70 hover:bg-white/5 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-xs text-[#F4EFEA]/45">
            Workspace / Overview
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#F4EFEA] sm:text-xl">
            Dashboard
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-[#251E2C] px-3 py-2 text-xs text-[#F4EFEA]/40 md:flex">
          <Search size={15} />
          Student Management
        </div>

        <button
          className="relative rounded-xl border border-white/10 p-2.5 text-[#F4EFEA]/65 transition hover:bg-white/5 hover:text-white"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D9A79C]" />
        </button>

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 rounded-xl bg-[#C3B1E1] px-3 py-2.5 text-sm font-semibold text-[#19141E] transition hover:bg-[#D4C7EA] sm:px-4"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Student</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
