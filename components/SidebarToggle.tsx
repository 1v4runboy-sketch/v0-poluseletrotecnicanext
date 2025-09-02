'use client';
export default function SidebarToggle({ onClick }){
  return (
    <button aria-label="Abrir menu" onClick={onClick} className="p-2 rounded-xl bg-white/70 dark:bg-white/10 shadow">
      <img src="/loading-logo.png" alt="" className="w-6 h-6"/>
    </button>
  );
}
