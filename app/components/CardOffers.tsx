"use client";

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function CardOffers({ title, description, children }: Props) {
    return (
        <div className="bg-white group transition-colors duration-200 hover:bg-primary shadow-sm mt-3 py-2 px-3 rounded-md flex items-start gap-3 max-w-full sm:max-w-xl">
            <div className="logo text-primary mt-1">
                <div className="h-12 w-12 group-hover:text-white transition-colors duration-200">{ children }</div>
            </div>

            <div className="transition-colors duration-200 group-hover:text-white text-content">
                <p className="text-lg font-semibold">{ title }</p>
                <p className="transition-colors duration-200 text-xs group-hover:text-stone-100 text-stone-500 font-light">{ description }</p>
            </div>

        </div>
    );
}