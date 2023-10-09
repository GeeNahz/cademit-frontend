import SectionTitle from "./SectionTitle";
import { FaGreaterThan, FaCaretRight, FaCaretLeft, FaSquareCaretLeft, FaRegSquareCaretLeft } from "react-icons/fa6"


interface Props {
    imageUrl: string;
    name: string;
    review: string;
}

const CardTestimonial = ({ imageUrl, name, review }: Props) => {
    return (
        <div className="carousel-item max-w-[335px] lg:max-w-md w-[335px] lg:w-full">
            <div className="wrapper p-3 w-full flex flex-col lg:flex-row justify-start items-center lg:items-start gap-3 lg:gap-8">
                <div className="profile-image relative">
                    <figure className="-z-10 h-24 lg:h-36 w-24 lg:w-36 border-8 border-primary rounded-full overflow-hidden after:content-[''] after:absolute after:inline-block after:top-0 lg:after:top-1 after:left-16 lg:after:left-28 after:h-0 after:w-0 after:border-r-transparent after:border-r-[16px] lg:after:border-r-[26px] after:border-l-[16px] lg:after:border-l-[26px] after:border-l-transparent after:border-b-[20px] lg:after:border-b-[36px] after:border-b-primary after:rotate-[40deg] lg:after:rotate-[51deg]">
                        <img src={imageUrl} alt={name} className="h-full w-full" />
                    </figure>
                </div>

                <div className="body space-y-3">
                    <p className="text-xs lg:text-sm text-slate-600 max-w-[190px] lg:max-w-full text-center lg:text-start">{ review }</p>

                    <h2 className="font-semibold text-base lg:text-xl text-accent-focus text-center lg:text-start w-full">{name}</h2>
                </div>
            </div>
        </div>
    );
}


export default function Testimonials() {
    const reviews = [
        {
            id: 1,
            name: "Jason Park",
            review: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet magnam architecto et amet, necessitatibus sint veniam debitis aliquid odio ullam?",
            imageUrl: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
        },
        {
            id: 1,
            name: "Mark Matthews",
            review: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet magnam architecto et amet, necessitatibus sint veniam debitis aliquid odio ullam?",
            imageUrl: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
        },
        {
            id: 3,
            name: "Sindy Lorence",
            review: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet magnam architecto et amet, necessitatibus sint veniam debitis aliquid odio ullam?",
            imageUrl: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
        },
    ];

    return (
        <div className="container mx-auto px-5 md:px-0">
            <div className="title">
                <SectionTitle subtitle="testimonials" title="Our students say" textAlign="center" />
            </div>

            <div className="w-full md:w-fit mx-auto flex items-center relative group">
                <div className="w-fit mx-auto === relative before:content-[''] before:absolute before:block before:left-0 before:top-0 before:bottom-0 before:w-10 before:bg-gradient-to-r before:from-[#F8F8F8] before:to-transparent before:z-10 == after:content-[''] after:absolute after:block after:right-0 after:top-0 after:bottom-0 after:w-10 after:bg-gradient-to-l after:from-[#F8F8F8] after:to-transparent after:z-10">
                    <div className="carousel rounded-box max-w-[335px] lg:max-w-md w-[335px] lg:w-full">
                        {
                            reviews.map((review) => (
                                <CardTestimonial imageUrl={review.imageUrl} name={review.name} review={review.review} key={review.id} />
                            ))
                        }
                    </div>
                </div>

                {/* scroll controls */}
                <div className="bg-opacity-0 group-hover:bg-opacity-10 transition duration-400 absolute p-3 bg-neutral rounded-full text-white -left-10 top-1/2 -translate-y-1/2 z-10">
                    <FaCaretLeft />
                </div>
                <div className="bg-opacity-0 group-hover:bg-opacity-10 transition duration-400 absolute p-3 bg-neutral rounded-full text-white -right-10 top-1/2 -translate-y-1/2 z-10">
                    <FaCaretRight />
                </div>
            </div>
        </div>
    );
}