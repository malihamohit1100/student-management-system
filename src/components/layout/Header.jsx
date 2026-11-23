
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Bell,
  Plus,
  Menu,
  UserRound,
  UserPlus,
  UserPen,
  UserMinus,
  X,
} from 'lucide-react';

import {
  selectActivities,
} from '../../features/students/studentsSlice';

const sectionTitles = {
  dashboard: 'Dashboard',
  students: 'Students',
  departments: 'Departments',
  settings: 'Settings',
};

const activityIcons = {
  added: UserPlus,
  edited: UserPen,
  deleted: UserMinus,
};

const activityLabels = {
  added: 'was added',
  edited: 'was updated',
  deleted: 'was deleted',
};

const Header = ({
  activeSection,
  onMenuClick,
  onAddClick,
}) => {
  const activities = useSelector(selectActivities);
  const [showNotifications, setShowNotifications] = useState(false);

  const formatActivityTime = (date) => {
    const activityDate = new Date(date);

    if (Number.isNaN(activityDate.getTime())) return '';

    return activityDate.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#19141E]/90 backdrop-blur-xl">
      <div className="flex min-h-20 items-center justify-between gap-4 px-5 py-3 md:px-8">

        {/* Page title */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-[#A99EAF] hover:bg-white/5 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>

          <div>
            <h2 className="text-lg font-semibold text-[#F4EFEA]">
              {sectionTitles[activeSection] || 'Dashboard'}
            </h2>

            <p className="hidden text-xs text-[#A99EAF] sm:block">
              Manage your academic records
            </p>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-3">

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications((current) => !current)}
              className="relative rounded-xl border border-white/10 bg-[#251E2C] p-2.5 text-[#A99EAF] transition hover:text-[#F4EFEA]"
              aria-label="Notifications"
              aria-expanded={showNotifications}
            >
              <Bell size={19} />

              {activities.length > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D9A79C] ring-2 ring-[#251E2C]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 z-50 w-[min(340px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-white/10 bg-[#251E2C] shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#F4EFEA]">
                      Recent Activity
                    </h3>
                    <p className="mt-1 text-xs text-[#A99EAF]">
                      Your latest student updates
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-[#A99EAF] hover:text-[#F4EFEA]"
                    aria-label="Close notifications"
                  >
                    <X size={17} />
                  </button>
                </div>

                {activities.length === 0 ? (
                  <div className="px-5 py-9 text-center">
                    <Bell
                      size={25}
                      className="mx-auto mb-3 text-[#8F8298]"
                    />
                    <p className="text-sm font-medium text-[#F4EFEA]">
                      No recent activity
                    </p>
                    <p className="mt-1 text-xs text-[#A99EAF]">
                      Student updates will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto">
                    {activities.map((activity) => {
                      const Icon =
                        activityIcons[activity.type] || Bell;

                      return (
                        <div
                          key={activity.id}
                          className="flex gap-3 border-b border-white/5 px-4 py-3 last:border-0"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C3B1E1]/10 text-[#C3B1E1]">
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs leading-5 text-[#F4EFEA]">
                              <span className="font-semibold">
                                {activity.studentName || 'A student'}
                              </span>{' '}
                              {activityLabels[activity.type]}
                            </p>

                            <p className="mt-1 text-[10px] text-[#A99EAF]">
                              {formatActivityTime(activity.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add student */}
          <button
            type="button"
            onClick={onAddClick}
            className="flex items-center gap-2 rounded-xl bg-[#C3B1E1] px-3 py-2.5 text-xs font-semibold text-[#19141E] transition hover:bg-[#D7C8EF] sm:px-4 sm:text-sm"
          >
            <Plus size={17} />
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
          </button>

          {/* Profile icon */}
          <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#251E2C] text-[#C3B1E1] sm:flex">
            <UserRound size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
