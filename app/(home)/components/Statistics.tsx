import { AcademicCapIcon, UserGroupIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { IconObj } from "@/app/types";
import { useGetIcon } from "@/utils/getIcon";

interface Props {
    value: string | number;
    title: string;
    children: React.ReactNode;
}

function StatisticItem({ value, title, children }: Props) {
    return (
        <div className="flex items-center gap-3">
            <div className="image h-16 w-16 rounded-box">
                { children }
            </div>

            <div className="text">
                <p className="text-3xl font-bold">{ value }</p>
                <p className="text-sm uppercase">{ title }</p>
            </div>
        </div>
    );
}

export default function Statistic() {
    const statItems = [
        {
            id: 1,
            title: "Courses",
            value: "3K+",
            logoUrl: ""
        },
        {
            id: 2,
            title: "Educators",
            value: "10K+",
            logoUrl: ""
        },
        {
            id: 3,
            title: "Students",
            value: "1K+",
            logoUrl: ""
        },
    ];

    const statItemsIcons: IconObj[] = [
        { id: 1, icon: <BookmarkIcon /> },
        { id: 2, icon: <AcademicCapIcon /> },
        { id: 3, icon: <UserGroupIcon /> },
    ];

    return (
        <div className="w-full bg-slate-100 backdrop-blur-3xl py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-16 px-5 md:px-0">
                {
                    statItems.map((item) => (
                    <div key={item.id}>
                        <StatisticItem title={item.title} value={item.value}>
                            { useGetIcon(statItemsIcons, item.id) }
                        </StatisticItem>
                    </div>
                    ))
                }
            </div>
        </div>
    );
}