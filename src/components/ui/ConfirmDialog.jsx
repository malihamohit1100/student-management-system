
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  student,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !student) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#251E2C] p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D9A79C]/15 text-[#D9A79C]">
            <AlertTriangle size={24} />
          </div>

          <button
            onClick={onCancel}
            className="rounded-lg p-2 text-[#F4EFEA]/50 hover:bg-white/5 hover:text-white"
            aria-label="Close dialog"
          >
            <X size={19} />
          </button>
        </div>

        <h3
          id="delete-title"
          className="mt-5 text-xl font-semibold text-[#F4EFEA]"
        >
          Delete student?
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#F4EFEA]/55">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-[#F4EFEA]">
            {student.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-[#F4EFEA]/70 transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-[#D9A79C] px-4 py-2.5 text-sm font-semibold text-[#19141E] transition hover:bg-[#E6B9AE]"
          >
            Delete Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
