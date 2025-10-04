// src/components/AdventureCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { adventuresDB } from '@/data/adventures';
import { mastersDB } from '@/data/masters'; // Импортируем базу мастеров

// 1. Обновляем свойства (пропсы) компонента
interface AdventureCardProps {
  adventureId: string;
  masterId: string; // <-- Новое свойство вместо name и avatarUrl
  dateTime: string;
  price: string;
  location: string; // <-- Новое
  startLevel: string; // <-- Новое
  playerCount: string; // <-- Новое
  duration: string; // <-- Новое
  telegramLobbyUrl: string;
  lobbyButtonText?: string;
}

export const AdventureCard = ({
  adventureId,
  masterId, // <-- Используем masterId
  dateTime,
  price,
  location,
  startLevel,
  playerCount,
  duration,
  telegramLobbyUrl,
  lobbyButtonText,
}: AdventureCardProps) => {

  // 3. Логика получения ДВУХ наборов данных внутри компонента
  const adventureData = adventuresDB[adventureId];
  const masterData = mastersDB[masterId]; // <-- Находим мастера по ID

  // 4. Единая проверка: если нет данных о приключении ИЛИ о мастере, не рендерим ничего
  if (!adventureData || !masterData) {
    // В консоли можно оставить предупреждение для отладки
    if (!adventureData) console.warn(`Adventure with ID "${adventureId}" not found.`);
    if (!masterData) console.warn(`Master with ID "${masterId}" not found.`);
    return null;
  }

  const queryParams = new URLSearchParams({
  master: masterId,
  dateTime: dateTime,
  price: price,
  location: location,
  startLevel: startLevel,
  playerCount: playerCount,
  duration: duration,
  telegramLobbyUrl: telegramLobbyUrl,
  });

  if (lobbyButtonText) {
    queryParams.append('lobbyButtonText', lobbyButtonText);
  }

  return (
    <Link 
      href={`/?view=${adventureId}&${queryParams.toString()}`}
      scroll={false}
      className="
        relative w-full group
        transition-all duration-300 ease-in-out
        hover:z-10 hover:scale-105 hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.96)]
      "
    >
      {/* Иллюстрация и заголовок берутся из adventureData */}
      {/* Меняем скругление с rounded-lg на кастомное rounded-[0.2rem] */}
      <div className="relative w-full aspect-[210/297] rounded-[0.2rem] overflow-hidden mb-[1.2rem]">
        <Image src={adventureData.imageUrl} alt={adventureData.title} fill className="object-cover" />
      </div>
      <div>
        <h3 className="text-heading-3 text-white mb-[0.4rem]">
          {adventureData.title}
        </h3>
        
        {/* Блок с датой и мастером */}
        <div className="flex items-center mb-[0.8rem]">
          <span className="text-label text-white">{dateTime}</span>
          <div className="w-[0.4rem] h-[0.4rem] bg-white rounded-full mx-2"></div>
          <div className="flex items-center">
            {/* Данные о мастере теперь берутся из masterData */}
            <Image
              src={masterData.avatarUrl}
              alt={masterData.name}
              width={16}
              height={16}
              className="rounded-full mr-1.5"
            />
            <span className="text-label text-white">{masterData.name}</span>
          </div>
        </div>
        
        {/* Цена */}
        <div className="inline-block border-[0.1rem] border-white rounded-[0.8rem] px-3 py-1">
          <p className="text-label-italics text-white">{price}</p>
        </div>
      </div>
    </Link>
  );
};