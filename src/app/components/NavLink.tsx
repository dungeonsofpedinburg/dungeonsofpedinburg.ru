// src/components/NavLink.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'pt-[3.2rem] pb-[2.4rem]', 
        'flex items-center border-b-4 transition-colors duration-200',
        'text-nav-link',
        isActive
          ? 'text-white border-pink-500 text-nav-link-bold'
          : 'text-white/60 hover:text-white border-transparent'
      )}
    >
      {children}
    </Link>
  );
};