// src/app/components/HighlightBlock.tsx
import React from 'react';

// 1. Определяем интерфейс пропсов для гибкой настройки
interface HighlightBlockProps {
  title: string;
  children: React.ReactNode; // Используем children для основного текста
  gradientColors?: {
    from: string;
    to: string;
  };
}

export const HighlightBlock = ({
  title,
  children,
  // 2. Задаем цвета градиента по умолчанию, как в задании
  gradientColors = { from: '#FF6901', to: '#FF3401' },
}: HighlightBlockProps) => {
  return (
    // 3. Основной контейнер, который вертикально складывает блоки без отступов
    <div className="flex flex-col rounded-[0.4rem] overflow-hidden">
      
      {/* --- Первый блок (Заголовок) --- */}
      <div
        className="px-[1.2rem] pt-[0.8rem] pb-[0.6rem]"
        // 4. Динамический градиент. Tailwind не может генерировать классы из переменных,
        // поэтому для полностью динамических цветов используется инлайн-стиль. Это правильный подход.
        style={{
          backgroundImage: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`,
        }}
      >
        <h2 className="text-heading-2 text-white">{title}</h2>
      </div>

      {/* --- Второй блок (Текст) --- */}
      <div className="bg-white/10 px-[1.2rem] pt-[0.8rem] pb-[0.8rem]">
        {/* 5. Используем ваши кастомные классы из global.css */}
        <p className="text-body-large text-zinc-100">{children}</p>
      </div>

    </div>
  );
};