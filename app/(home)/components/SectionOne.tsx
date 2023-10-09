import Image from "next/image";

import { BookOpenIcon, DocumentCheckIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

import CardOffers from "@/app/components/CardOffers";
import SectionTitle from "./SectionTitle";
import type { Offer, IconObj } from "@/app/types";
import { useGetIcon } from "@/utils/getIcon"


export default function SectionOne() {
    const ourOffers: Offer[] = [
        {
            id: 1,
            title: "Online courses",
            description: "With the help of our online courses, expand your knowledge. Learn at your own pace, whenever you want, anywhere, from basic to advanced skills in technology.",
        },
        {
            id: 2,
            title: "Get certified",
            description: "Learn by doing with our project-based learning strategy, where real-world projects are integrated into every course test and enhance your problem solving abilities.",
        },
        {
            id: 3,
            title: "Learn from experts",
            description: "Learn from experts in our online courses. Gain insights and practical knowledge from industry professionals to excel in your tech journey. let their expertise guide your success",
        },
    ];

    const ourOfferIcons: IconObj[] = [
        { id: 1, icon: <BookOpenIcon /> },
        { id: 2, icon: <DocumentCheckIcon /> },
        { id: 3, icon: <AcademicCapIcon /> },
    ];

    return (
        <div className="container py-20 lg:py-0 px-5 md:px-0 mx-auto flex justify-center items-end gap-32">
            <div className="hidden lg:flex image w-[445px] h-[561px] from-slate-100 to-slate-50 bg-gradient-to-t justify-center items-end">
                <Image src="/images/learn-anything.svg" alt="learn-anything" width={384} height={444} className="drop-shadow-2xl mb-5" />
            </div>

            <div className="text max-w-[406px] flex flex-col justify-center mb-5">
                <SectionTitle title="the convenience we offer" subtitle="Learn anything" textAlign="left" />

                <div className="offer-items">
                    {
                        ourOffers.map((offer) => <CardOffers title={offer.title} description={offer.description} key={offer.id} >{ useGetIcon(ourOfferIcons, offer.id) }</CardOffers>)
                    }
                </div>
            </div>
        </div>
    );
}