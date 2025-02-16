"use client"
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/DashboardHeader";
import { CourseCountContext } from "../_context/CourseCountContext";

const DashboardLayout = ({ children }) => {
    const [totalCourse, setTotalCourse] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
            <div className="min-h-screen bg-gray-50">
                {/* Mobile menu overlay */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                        onClick={toggleMobileMenu}
                    />
                )}

                {/* Sidebar */}
                <div className={`
                    fixed top-0 left-0 z-30
                    h-screen bg-white shadow-lg
                    transform transition-transform duration-300 ease-in-out
                    md:translate-x-0 md:w-64
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <SideBar onClose={toggleMobileMenu} />
                </div>

                {/* Main Content */}
                <div className="md:ml-64 min-h-screen transition-all duration-300">
                    <DashboardHeader onMenuClick={toggleMobileMenu} />
                    <div className="p-4 md:p-10">{children}</div>
                </div>
            </div>
        </CourseCountContext.Provider>
    );
};

export default DashboardLayout;