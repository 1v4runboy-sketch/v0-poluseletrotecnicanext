'use client';
import { SITE } from '@/lib/site';
import { IconInsta, IconWhats } from './icons';

export default function WhatsFloat(){
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
      <a href={SITE.whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
         className="w-12 h-12 rounded-full bg-white dark:bg-black/60 ring-1 ring-black/10 dark:ring-white/10 flex items-center justify-center hover:shadow">
        <IconWhats />
      </a>
      <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
         className="w-12 h-12 rounded-full bg-white dark:bg-black/60 ring-1 ring-black/10 dark:ring-white/10 flex items-center justify-center hover:shadow">
        <IconInsta />
      </a>
    </div>
  );
}
