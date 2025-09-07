'use client';

import { useEffect, useState, useRef } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    try {
      const ls = localStorage.getItem('theme');
      const preferred = ls || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const dark = preferred === 'dark';
      setIsDark(dark);
      applyTheme(dark ? 'dark' : 'light');
    } catch {}
  }, []);

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    root.style.colorScheme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }

  function onChange(e) {
    const checked = e.target.checked;
    setIsDark(checked);
    applyTheme(checked ? 'dark' : 'light');
  }

  return (
    <label title="Alternar tema">
      <input ref={ref} type="checkbox" className="theme-checkbox" checked={isDark} onChange={onChange} />
    </label>
  );
}
