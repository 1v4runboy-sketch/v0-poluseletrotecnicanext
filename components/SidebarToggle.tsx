'use client';

export default function SidebarToggle({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Abrir menu"
      className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition"
    >
      <img src="/loading-logo.png" alt="Abrir menu" className="w-7 h-7 object-contain" draggable={false} />
    </button>
  );
}
