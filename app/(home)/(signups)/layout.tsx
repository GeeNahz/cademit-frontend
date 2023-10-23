import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Provider from '@/app/components/Provider'
// import '@/app/globals.css'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider>
      <section className="font-inter bg-[#F8F8F8] text-neutral">
        <div className="main">
            <div className="gradient"></div>
        </div>

        <section className="app">
            {children}
        </section>
      </section>
    </Provider>
    )
}
