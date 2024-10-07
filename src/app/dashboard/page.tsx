"use client";

import { DashboardContainer } from "@/components/DashboardContainerComponents/DashboardContainer";
import { useSession } from "next-auth/react";
import { extractFirstName } from "../../../utils/extractFirstName";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const firstName = extractFirstName();
  return (
    <main className="container flex flex-col mx-auto">
      <div className="flex flex-col border-b border-neutral-300 pb-2 px-6">
        <h1 className="text-6xl font-light text-neutral-700">Dashboard</h1>
        <p className="text-2xl">
          Welcome to you personalized dashboard, {firstName}.
        </p>
      </div>
      <div>
        <DashboardContainer />
      </div>
    </main>
  );
};

export default Dashboard;
