import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TeacherNavbar from './components/TeacherNavbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QR Code Based Attedance App',
  description: 'Created by @shantanuk7 and @atharva0506',
}

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TeacherNavbar/>
        {children}
        </body>
    </html>
  )
}
