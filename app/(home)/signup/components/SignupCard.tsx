import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
    imageUrl: string;
    title: string;
    link: string;
    isActive: boolean;
}

const SignupCard = ({ imageUrl, title, link, isActive } : Props) => {
    const LinkStyle = clsx(
        "card w-full sm:w-96 shadow-xl bg-white hover:bg-primary-content transition-colors duration-200",
        {
            "pointer-events-none opacity-40": !isActive
        }
    );
    
    return (
        <Link href={link} className={LinkStyle}>
            <div className="min-h-[140px]">
                <figure className="px-10 pt-10 w-auto h-auto aspect-auto">
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={305}
                        height={304}
                        fill={false}
                        className="rounded-xl w-auto h-auto aspect-video"
                    />
                </figure>
            </div>
            <div className="card-body items-center text-center">
                <p>Sign up as</p>
                <h2 className="card-title text-primary">{ title }</h2>
                {/* <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */}
            </div>
        </Link>
    )
}

export default SignupCard;