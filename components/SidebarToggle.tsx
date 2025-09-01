'use client';
export default function SidebarToggle(){
  return (
    <button
      onClick={()=> window.dispatchEvent(new Event('sidebar:toggle'))}
      aria-label="Abrir menu lateral"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 ring-1 ring-black/10 dark:ring-white/10 hover:shadow overflow-hidden"
      title="Menu"
    >
      <img src="/loading-logo.png" alt="Abrir menu" className="w-full h-full object-contain" />
    </button>
  );
}
