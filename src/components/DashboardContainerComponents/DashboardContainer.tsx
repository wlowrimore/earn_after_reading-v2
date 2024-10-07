"use client";

import { usePathname } from "next/navigation";
import DashboardMainContent from "./DashboardMainContent";
import { HowItWorks } from "./HowItWorks";
import { CaseStudies } from "./CaseStudies";

export function DashboardContainer() {
  const pathname = usePathname();

  const renderContent = () => {
    switch (pathname) {
      case "/dashboard/how-it-works":
        return <HowItWorks />;
      case "/dashboard/case-studies":
        return <CaseStudies />;
      case "/dashboard":
        return <DashboardMainContent />;
      default:
        return <div>Page not found</div>;
    }
  };

  return <div className="container mx-auto p-4">{renderContent()}</div>;
}
