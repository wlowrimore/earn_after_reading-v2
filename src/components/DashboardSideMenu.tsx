"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserAvatar } from "./ui/UserAvatar";
import {
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  PackagePlus,
  Icon,
} from "lucide-react";

export function DashboardSideMenu() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      href: "/dashboard/how-it-works",
      label: "How it works",
      icon: HelpCircle,
    },
    { href: "/dashboard/case-studies", label: "Case studies", icon: BookOpen },
    {
      href: "/dashboard/task-creator",
      label: "Task creator",
      icon: PackagePlus,
    },
  ];

  return (
    <aside className="flex flex-col w-[20rem] h-[87vh] min-h-[77vh] py-4 bg-indigo-50/30 border-r border-neutral-400 mx-auto">
      <div className="w-full flex items-center justify-center mt-3 mb-6 pb-6 mx-auto border-b border-neutral-300 gap-1">
        <UserAvatar />
      </div>
      <nav className="px-8 space-y-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col mx-auto ${
                isActive
                  ? "text-[#6c2a4d] font-semibold"
                  : "text-gray-600 hover:text-indigo-400"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
        <div className="fixed bottom-24">
          <button
            onClick={() => signOut({ redirectTo: "/" })}
            className="w-[12rem] text-sm text-center px-6 py-1 tracking-wider rounded-full bg-[#6c2a4d] text-white hover:bg-neutral-800 transition duration-300 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </nav>
    </aside>
  );
}
