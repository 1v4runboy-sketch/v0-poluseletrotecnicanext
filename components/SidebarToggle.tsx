'use client';

export default function SidebarToggle({ onClick }:{ onClick: ()=>void }){
  return (
    <button
      type="button"
      aria-label="Abrir menu"
      onClick={onClick}
      className="rounded-xl px-3 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  );
}
