'use client';
import { useEffect, useState } from 'react';
import LogoSpinner from './LogoSpinner';
import SidebarToggle from './SidebarToggle';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import SearchGlobal from './SearchGlobal';

export default function Header(){
  const [open, setOpen] = useState(false);
  // Hero color sync (average of hero image)
  useEffect(()=>{
    const img = document.getElementById('hero-img') as HTMLImageElement | null;
    if(!img) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const onLoad = ()=>{
      try{
        const w = canvas.width = Math.min(100, img.naturalWidth);
        const h = canvas.height = Math.min(60, img.naturalHeight);
        ctx?.drawImage(img, 0,0,w,h);
        const data = ctx?.getImageData(0,0,w,h).data || new Uint8ClampedArray();
        let r=0,g=0,b=0,count=0;
        for(let i=0;i<data.length;i+=4){ r+=data[i]; g+=data[i+1]; b+=data[i+2]; count++; }
        r=Math.round(r/count); g=Math.round(g/count); b=Math.round(b/count);
        document.documentElement.style.setProperty('--hero-color', `rgb(${r} ${g} ${b})`);
      }catch(e){ /* cross-origin or other */ }
    };
    if(img.complete) onLoad(); else img.addEventListener('load', onLoad, { once:true });
    return ()=> img?.removeEventListener('load', onLoad);
  },[]);

  return (
    <header className="header-hero">
      <div className="max-w-6xl mx-auto flex items-center gap-3 px-4 py-3">
        <SidebarToggle onClick={()=>setOpen(true)} />
        <LogoSpinner />
        <div className="font-bold">Polus Eletrotécnica</div>
        <div className="flex-1" />
        <SearchGlobal />
        <ThemeToggle />
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </header>
  );
}
