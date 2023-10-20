import './globals.css'
import type { Metadata } from 'next'
import ProgressBarProvider from './components/ProgressBarProvider'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CADEMit',
  description: 'Welcome to CADEMit, your bus stop to finding the tutor you need. Sign up and get started with learning.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="cademit">
      <body className={"font-inter"}>
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </body>
    </html>
  )
}
