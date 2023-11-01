type HeaderProps = {
    pageTitle: string;
    children?: React.ReactNode;
};

export default function Header({ pageTitle, children }: HeaderProps) {
    return (
        <header className="w-full h-20 rounded-t-sm border-b border-b-stone-200 mb-5 flex justify-between items-center px-5">
            <h2 className="text-xl font-bold">{pageTitle}</h2>
            <main>{children}</main>
        </header>
    );
}
