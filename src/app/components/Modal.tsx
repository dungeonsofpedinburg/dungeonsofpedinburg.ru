'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import FocusLock from 'react-focus-lock';

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);

  // "Умная" функция закрытия, которая работает во всех сценариях
  const onDismiss = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Используем нашу новую "умную" функцию для закрытия по Escape
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onDismiss(); };
    document.addEventListener('keydown', onKeyDown);

    // Блокируем прокрутку фона
    document.body.style.overflow = 'hidden';

    // Функция очистки, которая сработает при закрытии модального окна
    return () => {
      setIsMounted(false);
      // Возвращаем прокрутку
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onDismiss]); // Зависимости не нужны, так как onDismiss самодостаточна

  const modalContent = (
    <div
      ref={overlayRef}
      // Используем "умную" функцию при клике на оверлей
      onClick={(e) => { if (e.target === overlayRef.current) onDismiss(); }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
    >
      <FocusLock>
        <div 
          className="h-full w-full
                     md:max-w-[52rem] md:p-[3.6rem] md:pl-0"
        >
          <div
            className="h-full w-full
                       bg-[#262426] text-white 
                       flex flex-col
                       overflow-hidden
                       animate-slide-in-right
                       md:rounded-[2rem] md:shadow-2xl"
          >
             {children}
          </div>
        </div>
      </FocusLock>
    </div>
  );

  if (isMounted) {
    return createPortal(modalContent, document.getElementById('modal-root')!);
  }

  return null;
};