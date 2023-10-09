"use client";

import Link from "next/link";

import {
    PencilSquareIcon,
    CodeBracketSquareIcon,
    LockClosedIcon,
    ArrowPathRoundedSquareIcon,
    DocumentMagnifyingGlassIcon,
    DevicePhoneMobileIcon,
    InformationCircleIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

import SectionTitle from "./SectionTitle";
import type { CourseCategory, IconObj } from "../types";
import { useGetIcon } from "@/utils/getIcon";


interface CoursesCardProps extends CourseCategory {
    children: React.ReactNode;
}

const CoursesCard = ({ name, availableCourses, children }: CoursesCardProps) => {    
    return (
        <div className="card shadow-sm rounded-md pt-5 bg-white hover:bg-primary hover:text-white transition-colors duration-200 group">
            <figure className="logo">
                <div className="w-20 h-20 object-cover text-primary group-hover:text-white transition-colors duration-200">
                    { children }
                </div>
            </figure>

            <div className="card-body items-center text-center">
                <div className="name card-title">{ name }</div>

                <Link href="/" className="courses text-sm text-primary whitespace-nowrap flex gap-1 flex-nowrap py-1 px-2 bg-stone-100 rounded-md">{ availableCourses } <p>Courses</p></Link>
            </div>
        </div>
    );
}


export default function Courses() {
    const courses: CourseCategory[] = [
        {
            id: 1,
            name: "UI/UX Design Course",
            availableCourses: 23,
            logoUrl: "",
        },
        {
            id: 2,
            name: "Web Development",
            availableCourses: 48,
            logoUrl: "",
        },
        {
            id: 3,
            name: "Cyber Security",
            availableCourses: 32,
            logoUrl: "",
        },
        {
            id: 4,
            name: "Software Engineering",
            availableCourses: 14,
            logoUrl: "",
        },
        {
            id: 5,
            name: "Web Management",
            availableCourses: 5,
            logoUrl: "",
        },
        {
            id: 6,
            name: "Mobile App Development",
            availableCourses: 23,
            logoUrl: "",
        },
        {
            id: 7,
            name: "Information Software",
            availableCourses: 3,
            logoUrl: "",
        },
        {
            id: 8,
            name: "Computer Science",
            availableCourses: 25,
            logoUrl: "",
        },
    ];

    const courseIcons: IconObj[] = [
        { id: 1, icon: <PencilSquareIcon /> },
        { id: 2, icon: <CodeBracketSquareIcon /> },
        { id: 3, icon: <LockClosedIcon /> },
        { id: 4, icon: <ArrowPathRoundedSquareIcon /> },
        { id: 5, icon: <DocumentMagnifyingGlassIcon /> },
        { id: 6, icon: <DevicePhoneMobileIcon /> },
        { id: 7, icon: <InformationCircleIcon /> },
        { id: 8, icon: <ComputerDesktopIcon /> },
    ];

    return (
        <div className="container mx-auto px-5 md:px-0">
            <div className="title">
                <SectionTitle subtitle="courses" title="Explore our courses" textAlign="center" />
            </div>

            <div className="course-categories grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    courses.map((course) => (
                        <CoursesCard name={course.name} availableCourses={course.availableCourses} logoUrl={course.logoUrl} key={course.id} id={course.id}>{ useGetIcon(courseIcons, course.id) }</CoursesCard>
                    ))
                }
            </div>
        </div>
    );
}