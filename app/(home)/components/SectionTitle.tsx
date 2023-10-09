type TextAlign = "left" | "center" | "right";

interface Props {
    title: string;
    subtitle: string;
    textAlign: TextAlign | "left";
}

export default function SectionTitle({ title, subtitle, textAlign }: Props) {
    const alignment = {
        left: "text-start",
        center: "text-center",
        right: "text-end",
    }
    
    return (
        <div className={alignment[textAlign] + ` mb-6 md:mb-12`}>
            <p className="uppercase text-sm md:text-base font-semibold text-primary">{ subtitle }</p>
            <p className="text-4xl md:text-5xl font-semibold font-satoshi capitalize">{ title }</p>
        </div>
    );
}