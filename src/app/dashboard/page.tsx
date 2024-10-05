import DashboardHeader from "@/components/DashboardHeader";
import React from "react";

const Dashboard = () => {
  return (
    <main className="container flex flex-col mx-auto p-12">
      <h1 className="text-6xl font-light py-3 text-neutral-700 border-b border-neutral-700">
        Dashboard
      </h1>
      <DashboardHeader />
    </main>
  );
};

export default Dashboard;
