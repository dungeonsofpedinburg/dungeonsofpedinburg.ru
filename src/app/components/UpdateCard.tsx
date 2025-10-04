// src/components/UpdateCard.tsx

import Image from 'next/image';
import Link from 'next/link';

// Интерфейс с пропсами остается без изменений
interface UpdateCardProps {
  slug: string;
  imageUrl: string;
  title: string;
  date: string;
}

export const UpdateCard = ({ slug, imageUrl, title, date }: UpdateCardProps) => {
  return (
    // 1. Убираем фон и тени с основной ссылки. Оставляем `group` для эффекта наведения.
    <Link 
      href={`/updates/${slug}`} 
      className="group block"
    >
      {/* 2. Контейнер для иллюстрации: добавляем скругление и нижний отступ */}
      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-[0.2rem] mb-[1.2rem]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105" // Эффект приближения сохраняем
        />
      </div>

      {/* 3. Контейнер для текста: убираем лишние отступы */}
      <div>
        {/* 4. Заголовок: добавляем нижний отступ и стилизуем по макету */}
        <h3 className="text-heading-3 text-white mb-2">
          {title}
        </h3>
        
        {/* 5. Дата: стилизуем по макету */}
        <p className="text-label text-white">
          {date}
        </p>
      </div>
    </Link>
  );
};