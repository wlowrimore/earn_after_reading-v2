import Link from "next/link";
import React from "react";

const DashboardHeader = () => {
  return (
    <ul className="flex items-center justify-evenly">
      <li className="font-semibold text-neutral-600 tracking-wider py-1 px-4 rounded-full mt-1 hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
        How It Works
      </li>
      <li className="font-semibold text-neutral-600 tracking-wider py-1 px-4 rounded-full mt-1 hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
        Case Studies
      </li>
      <li className="font-semibold text-neutral-600 tracking-wider py-1 px-4 rounded-full mt-1 hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
        Create Tasks
      </li>
      <li className="font-semibold text-neutral-600 tracking-wider py-1 px-4 rounded-full mt-1 hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
        Contact Us
      </li>
      <li className="font-semibold text-neutral-600 tracking-wider py-1 px-4 rounded-full mt-1 hover:bg-neutral-600 hover:text-white transition duration-300 cursor-pointer">
        SignOut
      </li>
    </ul>
  );
};

export default DashboardHeader;
