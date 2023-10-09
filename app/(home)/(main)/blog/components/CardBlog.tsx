import Link from "next/link";

interface Props {
    imageUrl?: string;
    title: string;
    description: string;
    link: string;
}

export default function CardBlog({ imageUrl, title, description, link, }: Props) {
    return (
        <Link href={link} className="card card-compact rounded-md shadow-xl max-w-xs">
            <figure><img src={imageUrl} alt={title} className="h-full w-full" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
            </div>
        </Link>
    );
}