// src/components/Logo.tsx

import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src="/images/logos/dungeons-of-pedinburg-logo.svg"
      alt="Логотип Подземелья Пединбурга"
      width={120} 
      height={42}
      // Убираем w-[12rem]. Оставляем только 'h-auto' и 'site-logo'
      className="h-auto site-logo" 
      priority
    />
  );
};