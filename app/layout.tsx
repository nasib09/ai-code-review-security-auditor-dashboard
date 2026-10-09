import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Code Review & Security Auditor Dashboard',
  description: 'AI-powered code review and security audit workspace.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
