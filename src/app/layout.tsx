import { SpeedInsights } from "@vercel/speed-insights/next"
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./components/Header";

const robotoFlex = localFont({
  src: "./fonts/RobotoFlex.ttf",
  display: "swap",
  variable: "--font-robotoflex",
});

export const metadata = {
  title: "Подземелья Пединбурга",
  description: "Ролевые игры живого действия",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${robotoFlex.variable} bg-black text-zinc-100 antialiased`}>
        <Header />
        <main className="pt-[7.8rem]">
          {children}
          <SpeedInsights />
        </main>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}