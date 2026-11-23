
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  title = 'Confirm action',
  message = 'Are you sure you want to continue?',
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#251E2C] p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D9A79C]/15 text-[#D9A79C]">
            <AlertTriangle size={22} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-[#A99EAF] hover:bg-white/5 hover:text-[#F4EFEA]"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <h3
          id="confirm-title"
          className="text-lg font-semibold text-[#F4EFEA]"
        >
          {title}
        </h3>

        <p
          id="confirm-message"
          className="mt-2 text-sm leading-6 text-[#A99EAF]"
        >
          {message}
        </p>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-[#F4EFEA] transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-[#D9A79C] px-4 py-2.5 text-sm font-semibold text-[#19141E] transition hover:bg-[#E6BDB4]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
