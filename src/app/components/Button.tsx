import React from 'react';
import clsx from 'clsx';

// Описываем «figma-свойства» копонента
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: 'primary' | 'secondary' | 'link';  // Свойство type называется intent, потому что html забронил себе слово type
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode; // контент внутри кнопки
}

// Создаем сам React-компонент
export const Button = ({
  intent = 'primary', // Значение по умолчанию
  size = 'medium',   // Значение по умолчанию
  children,
  className,
  ...props // Все остальные стандартные пропсы кнопки (onClick, disabled и т.д.)
}: ButtonProps) => {

  // Логика для стилей: здесь вся магия! Мы создаем "карту" стилей для каждого варианта

  const baseStyles = 'font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg transition-colors duration-200';

  const intentStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400',
    link: 'bg-transparent text-blue-600 hover:underline focus:ring-transparent',
  };

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-7 py-3 text-lg',
  };

  // Собираем все классы вместе с помощью clsx
  const buttonClasses = clsx(
    baseStyles,
    intentStyles[intent], // Выбираем стиль в зависимости от пропса intent
    sizeStyles[size],     // Выбираем стиль в зависимости от пропса size
    className             // Позволяет добавить любые доп. классы извне
  );

  // Возвращаем HTML-элемент кнопки с нашими стилями и пропсами
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};