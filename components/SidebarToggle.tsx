'use client';
import { IconMenu } from './icons';

export default function SidebarToggle(){
  return (
    <button
      onClick={()=> window.dispatchEvent(new Event('sidebar:toggle'))}
      aria-label="Abrir menu lateral"
      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/70 dark:bg-black/40 ring-1 ring-black/10 dark:ring-white/10 hover:shadow"
    >
      <IconMenu />
    </button>
  );
}
