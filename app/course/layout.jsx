import DashboardHeader from "@/app/dashboard/_components/DashboardHeader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CourseViewLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white border-b  shadow-sm">
        <div className="flex items-center justify-between px-4 py-0.5 max-w-[2000px] mx-auto">
          <Link href="/dashboard">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="logo"
                width={40}
                height={40}
                className="hover:rotate-12 transition-all duration-300 ease-in-out cursor-pointer"
              />
              <h2 className="font-bold text-2xl">StudyMate AI</h2>
            </div>
          </Link>

          <div className="border-0 [&_*]:border-none [&_*]:shadow-none [&_*]:ring-0 [&_*]:outline-none">
            <DashboardHeader />
          </div>
        </div>
      </div>

      <main className="mx-10 md:mx-36 lg:px-60 mt-10">{children}</main>
    </div>
  );
}

export default CourseViewLayout;