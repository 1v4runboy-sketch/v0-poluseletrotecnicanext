'use client';
import WhatsButton from '@/components/WhatsButton';
import { whatsappHref } from '@/lib/site';

/**
 * CTA de WhatsApp na Home (centralizado, logo abaixo do herói)
 */
export default function HomeWhatsCTA(){
  return (
    <section className="w-full flex items-center justify-center py-5">
      <div className="flex flex-col items-center gap-2">
        <WhatsButton href={whatsappHref()} text="Whatsapp" />
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Fale agora com um especialista
        </p>
      </div>
    </section>
  );
}
