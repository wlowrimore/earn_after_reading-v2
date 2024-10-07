"use client";

import { signOut, useSession } from "next-auth/react";
import { extractFirstName } from "../../utils/extractFirstName";
import { extractLastName } from "../../utils/extractLastName";
import { extractInitials } from "../../utils/extractInitials";

const DashboardHeader = () => {
  const { data: session } = useSession();
  console.log("Session:", session);

  const firstName = extractFirstName();
  const lastName = extractLastName();
  const initials = extractInitials();

  return (
    <aside className="flex flex-col w-[12rem] h-[77vh] min-h-[77vh] py-4 bg-purple-50 border-r border-neutral-400">
      <div className="w-full flex items-center justify-center mt-3 mb-12 pb-6 mx-auto border-b border-neutral-300 gap-1">
        <div className="text-lg font-bold bg-indigo-400 text-white rounded-full w-8 h-8 p-6 flex items-center justify-center">
          <h1>{initials}</h1>
        </div>
        <div className="leading-4 tracking-wide text-base text-black flex flex-col">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
      </div>
      <section className="px-8">
        <ul className="w-full h-full text-start space-y-3">
          <li className="text-sm text-black tracking-wider py-2 px-4 rounded-full mt-1 hover:bg-indigo-400 hover:text-white transition duration-300 cursor-pointer">
            How It Works
          </li>
          <li className="text-sm text-black tracking-wider py-2 px-4 rounded-full mt-1 hover:bg-indigo-400 hover:text-white transition duration-300 cursor-pointer">
            Case Studies
          </li>
          <li className="text-sm text-black tracking-wider py-2 px-4 rounded-full mt-1 hover:bg-indigo-400 hover:text-white transition duration-300 cursor-pointer">
            Create Tasks
          </li>

          <li className=" text-sm text-black tracking-wider py-2 px-4 rounded-full mt-1 hover:bg-indigo-400 hover:text-white transition duration-300 cursor-pointer">
            Contact Us
          </li>
          <li
            onClick={() => signOut({ redirectTo: "/" })}
            className="fixed bottom-28 text-sm text-black tracking-wider py-2 px-4 rounded-full hover:bg-indigo-400 hover:text-white transition duration-300 cursor-pointer"
          >
            SignOut
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default DashboardHeader;
