"use client";

import { useSession } from "next-auth/react";
import { extractFirstName } from "../../../utils/extractFirstName";
import React from "react";
import ComponentsHub from "@/components/DashboardContainerComponents/ComponentsHub";

const Dashboard = () => {
  const { data: session } = useSession();
  const firstName = extractFirstName();
  return (
    <main className="container flex flex-col mx-auto">
      <div className="flex flex-col border-b border-neutral-300 pb-3 px-6">
        <h1 className="text-6xl font-light text-neutral-700">Dashboard</h1>
        <p className="text-lg ml-1">
          Welcome to you personalized dashboard, {firstName}.
        </p>
      </div>
      <div>
        <ComponentsHub />
      </div>
    </main>
  );
};

export default Dashboard;
