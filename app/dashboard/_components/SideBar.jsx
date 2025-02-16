"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import { LayoutDashboard, Shield, UserCircle } from "lucide-react"; // Removed `{ icons }`
import { usePathname } from "next/navigation";
import { CourseCountContext } from "@/app/_context/CourseCountContext";

const SideBar = ({ onClose }) => {
    const MenuList = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            name: "Upgrade",
            icon: Shield,
            path: "/dashboard/upgrade",
        },
        {
            name: "Profile",
            icon: UserCircle,
            path: "/dashboard/profile",
        },
    ];

    const { totalCourse, setTotalCourse } = useContext(CourseCountContext);
    const path = usePathname();

    return (
        <div className="h-full flex flex-col">
            {/* Mobile Close Button */}
            <div className="md:hidden p-4 flex justify-end">
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Sidebar Content */}
            <div className="h-screen shadow-md p-5">
                {/* Logo */}
                <div className="flex gap-2 items-center">
                    <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
                    <h2 className="font-bold text-2xl">StudyMate AI</h2>
                </div>

                {/* Create Button */}
                <div className="mt-10">
                    <Link href={"/create"} className="w-full">
                        <Button className="w-full">+ Create New</Button>
                    </Link>

                    {/* Menu List */}
                    <div className="mt-5">
                        {MenuList.map((menu, index) => (
                            <Link href={menu.path} key={index}>
                                <div
                                    className={`mt-3 flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer ${
                                        path === menu.path && "bg-slate-200"
                                    }`}
                                >
                                    <menu.icon className="w-5 h-5" /> {/* Fixed JSX usage */}
                                    <h2>{menu.name}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Credits Section */}
                <div className="border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[85%]">
                    <h2 className="text-lg mb-2">Available Credits: {5 - totalCourse}</h2>
                    <Progress value={(totalCourse / 5) * 100} />
                    <h2 className="text-sm">{totalCourse} out of 5 Credits Used</h2>

                    <Link className="text-primary text-xs mt-3" href={"/dashboard/upgrade"}>
                        Upgrade to create more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
