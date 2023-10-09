import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="wrapper bg-white">
            <div className="min-h-screen bg-primary bg-opacity-30 min-w-full w-full flex flex-col items-center justify-center hero_gradient">
                <div className="content flex justify-center lg:justify-between items-center container mx-auto">
                    <div className="text-content text-center lg:text-start max-w-[490px] space-y-5">
                        <div className="title text-neutral">
                            <p className="text-6xl lg:text-7xl font-bold lg:font-extrabold capitalize font-satoshi light_gradient">
                                The Tech Plug you can trust
                            </p>
                        </div>

                        <div className="sub-title text-xs font-light text-neutral light_gradient">
                            <p>We are you reliable source for all things technological. Let our expertise
                                be your guide to seamless innovation and digital empowerment.</p>
                        </div>

                        <div className="ctas space-x-5">
                            <Link href="/signup" className="btn btn-primary">Sign up</Link>
                            <Link href="/about" className="btn btn-neutral btn-outline">Learn more</Link>
                        </div>
                    </div>

                    <div className="image-content hidden lg:block">
                        <img src="/images/hero-image.svg" alt="hero-image" width={580} height={553} className="transform translate-x-5 w-auto h-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
}