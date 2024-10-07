"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { extractFirstName } from "../../utils/extractFirstName";
import { extractLastName } from "../../utils/extractLastName";
import { extractInitials } from "../../utils/extractInitials";

export function DashboardHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/how-it-works", label: "How it works" },
    { href: "/dashboard/case-studies", label: "Case studies" },
  ];

  const firstName = extractFirstName();
  const lastName = extractLastName();
  const initials = extractInitials();

  return (
    <aside className="flex flex-col w-[12rem] h-[87vh] min-h-[77vh] py-4 bg-purple-50 border-r border-neutral-400">
      <div className="w-full flex items-center justify-center mt-3 mb-6 pb-6 mx-auto border-b border-neutral-300 gap-1">
        <div className="text-lg font-bold bg-indigo-400 text-white rounded-full w-8 h-8 p-6 flex items-center justify-center">
          <h1>{initials}</h1>
        </div>
        <div className="leading-4 tracking-wide text-base text-black flex flex-col">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
      </div>
      <nav className="px-8 space-y-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col ${
                isActive
                  ? "text-indigo-400 font-semibold"
                  : "text-gray-600 hover:text-indigo-400"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <div
          onClick={() => signOut({ redirectTo: "/" })}
          className="fixed bottom-24 text-sm tracking-wider py-1 px-6 rounded-full bg-indigo-400 text-white hover:bg-indigo-500 transition duration-300 cursor-pointer"
        >
          SignOut
        </div>
      </nav>
    </aside>
  );
}
