import { useRef, type ReactNode } from "react";
import { X } from "@phosphor-icons/react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

interface ModalProps {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
  widthClassName?: string;
}

export function Modal({ title, closeLabel, onClose, children, widthClassName = "max-w-lg" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true, onClose);
  useBodyScrollLock(true);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative max-h-[85svh] w-full ${widthClassName} overflow-y-auto rounded-lg border border-hairline bg-ink-soft p-6 sm:p-8`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="modal-title" className="font-display text-xl text-cream">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hairline text-cream hover:border-gold hover:text-gold-light"
          >
            <X size={18} weight="light" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
