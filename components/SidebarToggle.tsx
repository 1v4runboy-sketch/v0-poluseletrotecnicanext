'use client';

export default function SidebarToggle({ onClick }:{ onClick: ()=>void }){
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Abrir menu"
      className="flex items-center gap-2 rounded-xl px-3 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition"
      title="Menu"
    >
      <img src="/loading-logo.png" alt="" className="h-5 w-5 object-contain rounded" />
      <span className="text-[13px] font-semibold hidden sm:inline">Menu</span>
    </button>
  );
}
