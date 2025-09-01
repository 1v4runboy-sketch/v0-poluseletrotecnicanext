'use client';
import React from 'react';
import { MenuIcon } from './icons';
export default function SidebarToggle(){
  return (
    <button aria-label="Abrir menu" onClick={()=>window.dispatchEvent(new CustomEvent('sidebar:toggle'))} className="p-2 rounded-md hover:bg:black/5 dark:hover:bg-white/10">
      <MenuIcon />
    </button>
  );
}
