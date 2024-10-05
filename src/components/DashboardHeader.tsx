import Link from "next/link";
import React from "react";

const DashboardHeader = () => {
  return (
    <aside className="flex flex-col w-[12rem] h-[77vh] min-h-[77vh] p-4 bg-purple-50 border-r border-neutral-700">
      <ul className="w-full h-full space-y-3">
        <li className="font-semibold text-[0.8rem] text-neutral-700 tracking-wider py-2 px-4 rounded-full mt-1 hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
          How It Works
        </li>
        <li className="font-semibold text-[0.8rem] text-neutral-700 tracking-wider py-2 px-4 rounded-full mt-1 hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
          Case Studies
        </li>
        <li className="font-semibold text-[0.8rem] text-neutral-700 tracking-wider py-2 px-4 rounded-full mt-1 hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
          Create Tasks
        </li>

        <li className=" font-semibold text-[0.8rem] text-neutral-700 tracking-wider py-2 px-4 rounded-full mt-1 hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
          Contact Us
        </li>
        <li className="fixed bottom-28 font-semibold text-sm text-neutral-600 tracking-wider py-2 px-4 rounded-full hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
          SignOut
        </li>
      </ul>
    </aside>
  );
};

export default DashboardHeader;
