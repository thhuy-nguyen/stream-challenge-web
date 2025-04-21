'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher({ className = '', isDarkMode = false }) {
  const locale = useLocale();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    
    // Extract the path without the locale prefix
    const currentPathWithoutLocale = pathname.replace(/^\/[^\/]+/, '');
    const newPath = `/${newLocale}${currentPathWithoutLocale || ''}`;
    
    // Use window.location for a full page refresh instead of router.push
    window.location.href = newPath;
  };

  // Wait until component is mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <select 
      value={locale} 
      onChange={handleLanguageChange}
      className={`select select-sm border ${
        isDarkMode 
          ? 'bg-indigo-700 hover:bg-indigo-600 text-white border-indigo-500' 
          : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800 border-indigo-200'
      } ${className}`}
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="vi">Tiếng Việt</option>
    </select>
  );
}