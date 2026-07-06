import Link from "next/link";
import { Container } from "./components/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-heading-1 text-white mb-6">404</h1>
      <p className="text-body-large text-gray-300 mb-8">
        Страница не найдена
      </p>
      <p className="text-body-medium text-gray-400 mb-12">
        Возможно, она была перемещена или удалена.
      </p>
      <Link
        href="/"
        className="bg-[#D9298F] text-white py-[1.2rem] px-[3.2rem] rounded-lg 
                   hover:opacity-90 transition-opacity text-nav-link"
      >
        На главную
      </Link>
    </Container>
  );
}
