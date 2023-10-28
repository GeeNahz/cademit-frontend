import Provider from "@/app/components/Provider"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function DashboardBaseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Provider>
            <section className='bg-[#F8F8F8] text-neutral relative max-h-screen h-full'>
                <Navbar />

                <div className="main-wrapper flex w-full">
                    <Sidebar />
                    <main className='flex-1 max-w-[calc(100%-300px)] flex w-full min-h-[calc(100vh-3.75rem)] h-full overflow-hidden'>
                        <div className="main-container max-h-[calc(100vh-3.75rem)] overflow-y-scroll p-4">
                            {children}
                        </div>
                    </main>
                </div>
            </section>
        </Provider>
    )
}
