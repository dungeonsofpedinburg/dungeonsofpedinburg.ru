import { updatesDB } from '@/data/updates';
import { UpdateCard } from '../components/UpdateCard';
import { Container } from '../components/Container';

export default function UpdatesPage() {
  return (
    // Используем контейнер для центрирования и отступов
    <Container className="container mx-auto px-4 py-8">
      <div className="card-grid gap-[1.2rem] mt-[2rem]">
        {updatesDB.map((update) => (
          <UpdateCard
            key={update.slug}
            slug={update.slug}
            title={update.title}
            imageUrl={update.imageUrl}
            date={update.date}
          />
        ))}
      </div>
    </Container>
  );
}