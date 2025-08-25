// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Archivo para estilos globales

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creador de Tiendas',
  description: 'Crea tu propia tienda con un subdominio personalizado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}