
interface Props {
    linkUrl: string;
    children: React.ReactNode;
}

const SocialIcons = ({ linkUrl, children } : Props) => {
    return (
        <a href={linkUrl} target="_blank" className="social px-4 py-4 rounded-full text-white bg-primary hover:bg-primary-focus transition-colors duration-200">
            { children }
        </a>
    )
}

export default SocialIcons;