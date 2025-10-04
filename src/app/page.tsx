// src/app/page.tsx
import { Suspense } from 'react';
import PageContent from './PageContent';

export default function HomePage() {
  return (
    <main>
      {/* 
        Suspense - это "заглушка". Next.js сначала отрендерит пустую страницу,
        а затем, когда клиентский компонент PageContent загрузится в браузере,
        он появится на своем месте.
      */}
      <Suspense fallback={null}>
        <PageContent />
      </Suspense>
    </main>
  );
}