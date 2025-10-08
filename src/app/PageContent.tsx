// src/app/PageContent.tsx
'use client'; // <-- ВАЖНО: Помечаем этот компонент как клиентский

import { useSearchParams } from 'next/navigation';
import { adventuresDB } from '@/data/adventures';
import { mastersDB } from '@/data/masters';

import { Container } from './components/Container';
import { AdventureCard } from './components/AdventureCard';
import { Modal } from './components/Modal';
import { AdventureModal } from './components/AdventureModal';

export default function PageContent() {
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
    <>
      <Container className="py-8">
        <div className="card-grid gap-x-[1.2rem] gap-y-[2.4rem] mt-[2rem]">
          <AdventureCard
            adventureId="adventurers-ID"
            masterId="oleg-ostanin"
            dateTime="Без даты"
            price="690₽"
            location="Barbara Bus"
            startLevel="1 уровень"
            playerCount="От 4 до 5"
            duration="От 3 до 5 часов"
            telegramLobbyUrl="https://t.me/udostovirenie"
            lobbyButtonText="Заглянуть в лобби"
          />
          <AdventureCard
            adventureId="talent-devouring-golem"
            masterId="ivan-komarik"
            dateTime="Без даты>"
            price="1000₽"
            location="Barbara Bus"
            startLevel="1 уровень"
            playerCount="От 4 до 6"
            duration="От 3 до 5 часов"
            telegramLobbyUrl="https://t.me/gptgolematia"
            lobbyButtonText="Заглянуть в лобби"
          />
          <AdventureCard
            adventureId="barbara-is-waiting"
            masterId="maksim-novikov"
            dateTime="Без даты"
            price="690₽"
            location="Barbara Bus"
            startLevel="1 уровень"
            playerCount="От 4 до 5"
            duration="От 3 до 5 часов"
            telegramLobbyUrl="https://t.me/Barbara_Zhdet_dnd_story"
          />
        </div>
      </Container>

      {selectedAdventure && selectedMaster && telegramLobbyUrl && (
        <Modal>
          <AdventureModal
            adventure={selectedAdventure}
            master={selectedMaster}
            details={detailsGrid}
            lobbyUrl={telegramLobbyUrl}
            lobbyButtonText={lobbyButtonText || 'ЗАГЛЯНУТЬ В ЛОББИ'}
          />
        </Modal>
      )}
    </>
  );
}