import Image from "next/image";

const AboutHeroSection = () => {
    return (
        <div className="relative">
            <div className="min-h-[50vh] md:min-h-[90vh] pt-16 lg:pt-40 flex flex-col items-center justify-center lg:justify-start overflow-hidden relative === before:content-[''] before:absolute before:block before:h-screen lg:before:h-[90vh] before:w-screen lg:before:w-[90vw] before:bg-[#91BCD7] before:rounded-full lg:before:rounded-[50%] before:left-[50%] before:bottom-0 before:origin-bottom before:transform before:-translate-x-[50%] before:scale-[4]">
                <p className="text-5xl md:text-6xl font-extrabold text-white w-full text-center font-satoshi z-10">
                    About Us
                </p>

                <div className="hero-image hidden lg:block absolute -bottom-28">
                    <Image 
                        src="/images/about-image.svg"
                        alt="about us" 
                        width={903} 
                        height={641} 
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default AboutHeroSection;