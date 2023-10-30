import { FETCH_STATUS } from "@/utils/status";
import clsx from "clsx";
import { FaCheck, FaX } from "react-icons/fa6";
import { XMarkIcon, XCircleIcon } from "@heroicons/react/20/solid";

type MessageBoxProps = {
    messageType: keyof typeof FETCH_STATUS;
    description?: string;
    onSuccess?: () => any;
    onClose?: () => any;
};

export default function MessageBox({
    description,
    messageType,
    onSuccess,
    onClose,
}: MessageBoxProps) {

    function renderIcon(type: keyof typeof FETCH_STATUS) {
        switch (FETCH_STATUS[type]) {
            case FETCH_STATUS.SUCCESS:
                return <FaCheck />;
            case FETCH_STATUS.ERROR:
                return <FaX />;
            default:
                return <div></div>
        }
    }

    const iconTheme = clsx(
        "rounded-full w-fit h-fit p-8 text-white text-6xl flex flex-col items-center justify-center",
        {
            "bg-green-500": FETCH_STATUS[messageType] === FETCH_STATUS.SUCCESS,
            "bg-red-500": FETCH_STATUS[messageType] === FETCH_STATUS.ERROR,
        },
    );

    const btnTheme = clsx(
        "text-white border-0 underline underline-offset-4 transition-colors",
        {
            "text-teal-900 hover:text-teal-600": FETCH_STATUS[messageType] === FETCH_STATUS.SUCCESS,
            "text-red-700 hover:text-red-400": FETCH_STATUS[messageType] === FETCH_STATUS.ERROR,
        },
    );

    return (
        <div className="relative rounded-lg py-10 px-16 bg-white h-fit w-fit text-center justify-center items-center flex flex-col">
            <span className="absolute top-2 right-2 cursor-pointer rounded-full p-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-300" title="close" onClick={onClose}>
                <XMarkIcon className="text-gray-500 h-7 w-7" />
            </span>

            <div className={iconTheme}>
                {renderIcon(messageType)}
            </div>

            <>
                {
                    description && (
                        <p className="desc">{description}</p>
                    )
                }
            </>

            {
                onSuccess &&
                <div className="action mt-10 h-fit w-fit">
                    <button onClick={onSuccess} className={btnTheme}>Proceed</button>
                </div>
            }
        </div>
    );
}