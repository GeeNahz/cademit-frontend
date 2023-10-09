import CardOffers from "@/app/components/CardOffers";
import AboutHeroSection from "./components/AboutHeroSection";

import { TbTargetArrow, TbBulb } from "react-icons/tb";
import { IconObj } from "@/app/types";
import { useGetIcon } from "@/utils/getIcon";
import SectionTitle from "@/app/components/SectionTitle";
import { TeamData } from "./types";
import TeamMemberCard from "./components/TeamMemberCard";
import Testimonials from "@/app/components/Testimonials";

export default function AboutPage() {
  const missionVision = [
    {
      id: 1,
      title: "Our Mission",
      description: "A Citadel of Innovation through Education and Product Development leading to a sustainable Startup Ecosystem.",
    },
    {
      id: 2,
      title: "Our Vision",
      description: "Becoming a Leading Citadel of Innovation.",
    },
  ];

  const missionVisionIcons: IconObj[] = [
    {
      id: 1,
      icon: <TbTargetArrow className="h-full w-full"/>
    },
    {
      id: 2,
      icon: <TbBulb className="h-full w-full"/>
    },
  ];

  const teamMembers: TeamData[] = [
    {
      id: 1,
      name: "John Smith",
      imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVuJTIwcHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      contact: {
        email: "smithj@mail.com",
      },
      role: "Founder",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, aspernatur.",
    },
    {
      id: 2,
      name: "Stacy Simon",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      contact: {
        email: "stamon@mail.com",
      },
      role: "COO and Creative Director",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, aspernatur. Dolor sit consectetur adipisicing elit. Quas, aspernatur.",
    },
    {
      id: 3,
      name: "Andrew Carter",
      imageUrl: "https://images.unsplash.com/photo-1649057349440-38c14e985208?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fG1lbiUyMHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      contact: {
        email: "adnee-c@mail.com",
      },
      role: "Director of Design",
      position: "UI/UX Designer",
      note: "Lorem sit amet consectetur adipisicing elit. Quas, aspernatur.",
    },
    {
      id: 4,
      name: "Lusy Hassan",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      contact: {
        email: "Lussan@mail.com",
      },
      role: "Director of Web Development",
      position: "Backend Developer",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, aspernatur.",
    },
  ];

  return (
    <div className="min-h-[100vh] w-full">
      <AboutHeroSection />

      <section className="container content mt-20 lg:mt-40 mb-40 mx-auto grid place-items-center max-w-5xl w-full">
        <div className="w-fit grid grid-cols-1 lg:grid-cols-2 gap-3 ">
          {
            missionVision.map((item) => (
              <CardOffers
                description={item.description}
                title={item.title}
                key={item.id}
              >
                { useGetIcon(missionVisionIcons, item.id) }
              </CardOffers>
            ))
          }
        </div>
      </section>

      <section className="meet-cademit container mx-auto mb-40">
        <div className="title">
          <SectionTitle subtitle="Meet" textAlign="center" title="CADEMit"/>
        </div>

        <div className="meet-cademit flex flex-col lg:flex-row gap-5 items-start">
          <div className="text w-full bg-slate-300 h-96 rounded-box"></div>

          <div className="image w-full bg-slate-300 h-96 rounded-box"></div>
        </div>
      </section>

      <section className="meet-team container mx-auto mb-40">
        <div className="title">
          <SectionTitle subtitle="Meet" textAlign="center" title="The Team"/>
        </div>

        <div className="meet-cademit flex flex-col sm:flex-row flex-wrap gap-5 items-center lg:items-start justify-center">
          {
            teamMembers.map((member) => (
              <div key={member.id}>
                <TeamMemberCard
                  name={member.name}
                  position={member.role as string}
                  imageUrl={member.imageUrl}
                />
              </div>
            ))  
          }
        </div>
      </section>

      <div className="testimonials container mx-auto mb-40">
        <Testimonials />
      </div>
    </div>
  );
}