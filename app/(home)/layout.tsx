import '@/app/globals.css'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <section className="font-inter">
        <Navbar />
        {children}
        <Footer />
      </section>
    )
}
