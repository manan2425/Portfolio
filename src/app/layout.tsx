import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Manan — Full Stack Engineer & Designer',
  description: 'Personal portfolio of Manan. Crafting clean, human-centered web applications, software systems, and digital products.',
  openGraph: {
    title: 'Manan — Portfolio',
    description: 'Selected engineering works, projects, and crafts by Manan.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
