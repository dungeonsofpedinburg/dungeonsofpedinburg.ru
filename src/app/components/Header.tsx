// src/components/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import { NavLink } from './NavLink';
import { Logo } from './Logo';
import { Container } from './Container';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black drop-shadow-[0_32px_20px_rgba(0,0,0,0.48)]">
      
      {/* 1. ГЛАВНОЕ ИЗМЕНЕНИЕ - КЛАССЫ КОНТЕЙНЕРА */}
      <Container 
        className="flex items-center 
                   /* --- Стили для мобильных (< 768px) --- */
                   justify-start         /* Выравниваем все по левому краю */
                   gap-[2.4rem]          /* Задаем жесткий отступ между левым и правым блоком */
                   overflow-x-auto       /* Включаем горизонтальный скролл */
                   hide-scrollbar        /* Прячем сам скроллбар */
                   
                   /* --- Стили для десктопа (> 768px) --- */
                   md:justify-between    /* Возвращаем распределение по краям */
                   md:gap-0              /* Убираем жесткий отступ */
                   md:overflow-x-visible /* Отключаем скролл */
                   "
      >
        
        {/* 2. Левая часть: добавляем flex-shrink-0, чтобы блок не сжимался */}
        <div className="flex items-center gap-[2.4rem] flex-shrink-0">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="flex items-center gap-[2.4rem]">
            <NavLink href="/">Список игр</NavLink>
            <NavLink href="/updates">Обновления</NavLink>
          </nav>
        </div>

        {/* 3. Правая часть: тоже добавляем flex-shrink-0 */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href="https://t.me/dungeonsofpedinburgcommunity"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-[0.1rem] border-white/60 hover:border-white rounded-[0.8rem] px-[0.8rem] py-[0.4rem] transition-colors duration-200"
          >
            <span className="text-nav-link text-white/60 group-hover:text-white transition-colors duration-200">
              Вступить в сообщество
            </span>
          </Link>

          <Link
            href="https://t.me/dungeonsofpedinburg"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity duration-200"
          >
            <div className="relative site-icon">
              <Image
                src="/svgs/telegram.svg"
                alt="Telegram канал"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

      </Container>
    </header>
  );
};