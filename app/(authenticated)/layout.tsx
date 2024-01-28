import '../globals.css'

import NavComponent from '@/components/NavSection/NavComponent'
import RightSectionComponent from '@/components/RightSectionComponent'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`flex flex-row w-full h-full place-content-center relative`}>
        {
          <>
            <NavComponent />
            <main className="w-[600px] border-x border-slate/25 flex flex-col">
              {children}
            </main>
            <RightSectionComponent />
          </>
        }
      </body>
    </html>
  )
}
