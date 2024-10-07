"use client";

import { useSession } from "next-auth/react";
import { extractFirstName } from "../../../utils/extractFirstName";

const DashboardMainContent = () => {
  const { data: session } = useSession();
  const firstName = extractFirstName();
  return (
    <main id="dashboard" className="p-2">
      <h1>Main Dashboard</h1>
    </main>
  );
};

export default DashboardMainContent;
