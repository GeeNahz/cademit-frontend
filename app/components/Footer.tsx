import Link from "next/link";

import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import { PhoneIcon, EnvelopeIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { IconObj } from "@/app/types";
import { useGetIcon } from "@/utils/getIcon";
import SocialIcons from "@/app/components/SocialIcons";


interface ListCardProps {
    title: string;
    date: Date;
    imageUrl: string;
    link: string;
}

const ListCard  = ({ title, date, imageUrl, link } : ListCardProps) => {
  return (
    <Link href={link} className="flex gap-3 items-start h-max min-w-76 mb-5 p-2">
        <div className="image h-12 w-12 bg-neutral-content rounded-md overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
        
        <div className="text-content">
            <div className="date mb-1">
                <p className="text-xs font-light text-primary">{ date.toLocaleString()}</p>
            </div>

            <div className="title">
                <p className="text-base">{ title }</p>
            </div>
        </div>
    </Link>
  )
}


export default function Footer() {
    const exploreLinks = [
        {
            id: 1,
            name: "About Us",
            link: "/about",
        },
        {
            id: 2,
            name: "Services",
            link: "",
        },
        {
            id: 3,
            name: "Courses",
            link: "",
        },
        {
            id: 4,
            name: "Blog",
            link: "",
        },
        {
            id: 5,
            name: "Contact Us",
            link: "",
        },
    ];

    const quickLinks = [
        {
            id: 1,
            name: "Contact Us",
            link: "",
        },
        {
            id: 2,
            name: "Terms and conditions",
            link: "",
        },
        {
            id: 3,
            name: "Privacy",
            link: "",
        },
        {
            id: 4,
            name: "Feedbacks",
            link: "",
        },
    ];

    const recentPosts = [
        {
            id: 1,
            title: "Creativity and inspiration",
            date: new Date(),
            imageUrl: "https://images.unsplash.com/photo-1523635252177-cedd4a1502c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGltYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            link: "/",
        },
        {
            id: 2,
            title: "Creativity and inspiration",
            date: new Date(),
            imageUrl: "https://images.unsplash.com/file-1682622471311-bc563ce601cbimage?dpr=2&auto=format&fit=crop&w=416&q=60",
            link: "/",
        },
        {
            id: 3,
            title: "Creativity and inspiration",
            date: new Date(),
            imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsb2clMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            link: "/",
        },
    ];

    const contacts = [
        {
            id: 1,
            value: "+234 123 456 7890",
        },
        {
            id: 2,
            value: "info@cademit.com",
        },
    ];

    const contactsIcon: IconObj[] = [
        { id: 1, icon: <PhoneIcon /> },
        { id: 2, icon: <EnvelopeIcon /> },
    ];

    return (
        <footer className="w-full bg-slate-100 pt-20">
            <div className="flex flex-col md:flex-row items-start gap-10 md:gap-5 pb-20 px-5 md:px-0 w-full container mx-auto">
                <div className="first-col max-w-xs space-y-6">
                    <div className="logo">
                        <img
                            src="/logo.png"
                            className=""
                            alt="CADEMit"
                            width="145"
                            height="51.55"
                        />
                    </div>

                    <div className="small-text">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum nam facilis eveniet tenetur suscipit veritatis odio, vel ad perferendis doloribus.
                    </div>

                    <div className="social-icons flex gap-3 items-center">
                        <SocialIcons linkUrl="https://www.instagram.com/cademit_/">
                            {<FaInstagram />}
                        </SocialIcons>

                        <SocialIcons linkUrl="https://www.facebook.com/cademitinc?mibextid=ZbWKwL">
                            {<FaFacebookF />}
                        </SocialIcons>

                        <SocialIcons linkUrl="https://twitter.com/Cademit_">
                            {<FaTwitter />}
                        </SocialIcons>
                    </div>
                </div>

                <div className="second-col flex-1 flex flex-wrap gap-10 justify-between items-start">
                    <div>
                        <p className="title font-semibold text-lg mb-10">Explore</p>

                        <div>
                            {
                                exploreLinks.map((explore) => (
                                    <div key={explore.id} className="py-px mb-2 flex gap-3 items-center group">
                                        <ArrowLongRightIcon className="w-4 text-primary" />
                                        <a href={explore.link} className="group-hover:text-accent-focus transition-colors">{explore.name}</a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <p className="title font-semibold text-lg mb-10">Quick Links</p>

                        <div>
                            {
                                quickLinks.map((link) => (
                                    <div className="py-px mb-2 flex gap-3 items-center group" key={link.id}>
                                        <ArrowLongRightIcon className="w-4 text-primary" />
                                        <a href="#" className="group-hover:text-accent-focus transition-colors">{link.name}</a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <p className="title font-semibold text-lg mb-10">Recent Posts</p>

                        <div>
                            {
                                recentPosts.map((post) => (
                                    <div key={post.id}>
                                        <ListCard
                                            title={post.title}
                                            date={post.date}
                                            link={post.link}
                                            imageUrl={post.imageUrl}
                                        />
                                    </div>
                                    // <li className=" py-px px-3 mb-2"><a href="#">{ post.name }</a></li>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <p className="title font-semibold text-lg mb-10">Have a Question?</p>

                        <div>
                            {
                                contacts.map((contact) => (
                                    <div className="py-px px-3 mb-5 flex gap-1 items-center" key={contact.id}>
                                        <p className="mr-3 h-4 w-4 text-primary">{useGetIcon(contactsIcon, contact.id)}</p> {contact.value}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>

            <div className="title font-medium py-5 w-full bg-stone-100 flex gap-3 items-center justify-center text-sm text-slate-500">
                <p>CADEMit &copy; 2023</p>
            </div>
        </footer>
    );
}
