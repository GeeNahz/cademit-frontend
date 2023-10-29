type ModalPopupProps = {
    children?: React.ReactNode;
};

export default function ModalPopup({ children }: ModalPopupProps) {
    return (
        <div className="backdrop-blur-sm bg-opacity-50 bg-gray-600 fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 flex flex-col items-center justify-center">
            { children }
        </div>
    );
}