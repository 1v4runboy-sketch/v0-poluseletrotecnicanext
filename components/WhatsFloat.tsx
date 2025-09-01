'use client';
import React from 'react';
import { InstagramIcon, WhatsIcon } from './icons';
import { SITE } from '@/lib/site';
export default function WhatsFloat(){
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      <a aria-label="WhatsApp" href={SITE.whatsappHref()} target="_blank" rel="noreferrer" className="rounded-full p-3 bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-lg hover:scale-105 transition">
        <WhatsIcon />
      </a>
      <a aria-label="Instagram" href={SITE.instagram} target="_blank" rel="noreferrer" className="rounded-full p-3 bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-lg hover:scale-105 transition">
        <InstagramIcon />
      </a>
    </div>
  );
}
