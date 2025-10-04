// src/app/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { adventuresDB } from '@/data/adventures';
import { mastersDB } from '@/data/masters';

import { Container } from './components/Container';
import { Button } from "./components/Button";
import { AdventureCard } from './components/AdventureCard';
import { Modal } from './components/Modal';
import { AdventureModal } from './components/AdventureModal';

export default function HomePage() {
  const searchParams = useSearchParams();

  const adventureId = searchParams.get('view');
  const masterId = searchParams.get('master');
  const dateTime = searchParams.get('dateTime');
  const price = searchParams.get('price');
  const location = searchParams.get('location');
  const startLevel = searchParams.get('startLevel');
  const playerCount = searchParams.get('playerCount');
  const duration = searchParams.get('duration');
  const telegramLobbyUrl = searchParams.get('telegramLobbyUrl');
  const lobbyButtonText = searchParams.get('lobbyButtonText');

  const selectedAdventure = adventureId ? adventuresDB[adventureId] : null;
  const selectedMaster = masterId ? mastersDB[masterId] : null;

  const detailsGrid = [
    { label: 'Дата и время', value: dateTime },
    { label: 'Место проведения', value: location },
    { label: 'Стоимость для игрока', value: price },
    { label: 'Уровень на старте', value: startLevel },
    { label: 'Количество игроков', value: playerCount },
    { label: 'Продолжительность', value: duration },
  ];

  return (
    // 1. <main> больше не нужны никакие классы.
    <main>
      {/* 2. Используем НАШ ЕДИНСТВЕННЫЙ КОНТЕЙНЕР. */}
      {/* Добавляем ему только вертикальные отступы. */}
      <Container className="py-8">
        
        {/* 3. Убираем лишнюю div-обертку вокруг сетки. */}
        {/* Адаптивная сетка теперь применяется прямо к этому div. */}
        <div className="card-grid gap-x-[1.2rem] gap-y-[2.4rem] mt-[2rem]">
          <AdventureCard
            adventureId="talent-devouring-golem"
            masterId="ivan-komarik"
            dateTime="12 октября"
            price="390Р"
            location="ДНК-маркет"
            startLevel="1 уровень"
            playerCount="4 игрока"
            duration="1,5 часа"
            telegramLobbyUrl="https://forms.gle/xv24tc7xRixBW31M6"
            lobbyButtonText="Заполнить форму"
          />
          <AdventureCard
            adventureId="talent-devouring-golem"
            masterId="alexey-kakaulin"
            dateTime="12 октября"
            price="390Р"
            location="ДНК-маркет"
            startLevel="1 уровень"
            playerCount="4 игрока"
            duration="1,5 часа"
            telegramLobbyUrl="https://forms.gle/xv24tc7xRixBW31M6"
            lobbyButtonText="Заполнить форму"
          />
          <AdventureCard
            adventureId="barbara-is-waiting"
            masterId="maksim-novikov"
            dateTime="Без даты"
            price="690Р"
            location="Barbara Bus"
            startLevel="1 уровень"
            playerCount="От 4 до 5"
            duration="От 3 до 5 часов"
            telegramLobbyUrl="https://t.me/Barbara_Zhdet_dnd_story"
          />
        </div>
      </Container>

      {/* Модальное окно остается как есть, вне потока контента */}
      {selectedAdventure && selectedMaster && telegramLobbyUrl && (
        <Modal>
          {/* --- ИЗМЕНЕНИЕ ЗДЕСЬ --- */}
          <AdventureModal
            adventure={selectedAdventure}
            master={selectedMaster}
            details={detailsGrid}
            lobbyUrl={telegramLobbyUrl}
            // Добавляем недостающий пропс.
            // Если lobbyButtonText из URL существует (не null), используем его.
            // Иначе (||), используем текст по умолчанию.
            lobbyButtonText={lobbyButtonText || 'ЗАГЛЯНУТЬ В ЛОББИ'}
          />
        </Modal>
      )}
    </main>
  );
}