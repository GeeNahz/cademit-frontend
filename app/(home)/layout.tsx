import '@/app/globals.css'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Provider from '../components/Provider'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider>
      <section className="font-inter bg-[#F8F8F8] text-neutral">
        <Navbar />
        {children}
        <Footer />
      </section>
    </Provider>
    )
}
