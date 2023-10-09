// export default function Home() {
  
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24 text-amber-300">
//       Home page
//     </main>
//   )
// }
import Image from 'next/image'

import HeroSection from "./components/HeroSection"
import SectionOne from "./components/SectionOne";
import Statistic from './components/Statistics';
import Courses from "../components/CourseCateogry";
import Testimonials from "../components/Testimonials";
import Blogs from './components/Blogs';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="hero-section h-fit w-full">
        <HeroSection />
      </div>
      <div className="first-section">
        <SectionOne />
      </div>
      <div className="stats-section">
        <Statistic />
      </div>
      <div className="courses-section pt-20">
        <Courses />
      </div>
      <div className="testimonials pt-44">
        <Testimonials />
      </div>
      <div className="blogs pt-44">
        <Blogs />
      </div>
      <div className="newsletter pt-40">
        <Newsletter />
      </div>
    </div>
  )
}

