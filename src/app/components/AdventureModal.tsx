// src/components/AdventureModal.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

import { Adventure } from '@/data/adventures';
import { Master } from '@/data/masters';

interface AdventureModalProps {
  adventure: Adventure;
  master: Master;
  details: { label: string; value: string | null }[];
  lobbyUrl: string;
  lobbyButtonText: string;
}

export const AdventureModal = ({ adventure, master, details, lobbyUrl, lobbyButtonText, }: AdventureModalProps) => {
  const router = useRouter();

  const onDismiss = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="relative flex flex-col h-full">
      {/* Кнопка закрытия (поверх всего) */}
      <button
        onClick={onDismiss}
        aria-label="Закрыть"
        className="absolute top-[2.4rem] right-[2.4rem] z-20 
                   w-[3.6rem] h-[3.6rem] rounded-full bg-white/40 hover:bg-white/70
                   flex items-center justify-center transition-colors"
      >
        <X strokeWidth={2} className="text-white w-[2rem] h-[2rem] stroke-[0.2rem]" />
      </button>

      {/* СКРОЛЛЯЩАЯСЯ ОБЛАСТЬ */}
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {/* Картинка: теперь с фиксированной высотой и обрезкой */}
        <div className="relative w-full h-[36rem] overflow-hidden">
          <Image
            src={adventure.coverImageUrl}
            alt={adventure.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Контейнер для текста с отступами */}
        <div className="px-[2.4rem] py-[2.4rem]">
          {/* Заголовок */}
          <h1 className="text-heading-1 text-white mb-[1.6rem]">{adventure.title}</h1>

          {/* Описание */}
          <p className="text-body-large text-gray-300 whitespace-pre-wrap mb-[4.8rem]">
            {adventure.description}
          </p>

          {/* Сетка с деталями игры */}
          <div className="modal-details-grid gap-[2.4rem] mb-[3.2rem]">
            {details.map(item => item.value && (
              <div key={item.label}>
                <p className="text-label text-gray-400 mb-1">{item.label}</p>
                <p className="text-label-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Блок с мастером */}
          <div className="flex items-center gap-4">
            <Image src={master.avatarUrl} alt={master.name} width={64} height={64} className="rounded-full" />
            <div>
              <p className="text-label text-gray-400 mb-1">Мастер игры</p>
              <p className="text-label-bold text-white">{master.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ФУТЕР (НЕ СКРОЛЛИТСЯ) */}
      <div className="flex-shrink-0 px-[2rem] pb-[3.6rem] shadow-[0_-8px_16px_rgba(0,0,0,0.32)]">
        <div className="w-full h-[0.04rem] bg-white/40 mb-[2.4rem]"></div> {/* Линия */}
        <a
          href={lobbyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#D9298F] text-white
                     py-[1.2rem] px-[2rem] rounded-lg 
                     hover:opacity-90 transition-opacity
                     flex items-center justify-center"
        >
          <span className="text-nav-link">{lobbyButtonText}</span>
        </a>
      </div>
    </div>
  );
};