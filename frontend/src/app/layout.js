import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import './globals.css';

// Load Geist Sans
const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/Geist-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
});

const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/GeistMono-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
});

export const metadata = {
  title: 'Real Estate',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}