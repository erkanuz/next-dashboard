import { Header, TopBar, TopElements } from "@/components";
import { Bar, RecentOrders } from "@/components/MainMenuParts";

export default function Home() {
  return (
    <div>
      <main className="min-h-screen bg-white ml-20 select-none">
        <TopBar />
        <Header />
        <TopElements />
        <div className='grid md:grid-cols-3 grid-cols-1 gap-4 p-4'>
          <Bar />
          <RecentOrders />
        </div>
      </main>
    </div>
  )
}