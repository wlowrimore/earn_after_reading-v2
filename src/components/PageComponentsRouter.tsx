"use client";

import { usePathname } from "next/navigation";
import ComponentsHub from "../components/DashboardContainerComponents/ComponentsHub";
import { HowItWorks } from "../components/HowItWorks";
import { CaseStudies } from "../components/CaseStudies";

export function DashboardContainer() {
  const pathname = usePathname();

  const renderContent = () => {
    switch (pathname) {
      case "/dashboard/how-it-works":
        return <HowItWorks />;
      case "/dashboard/case-studies":
        return <CaseStudies />;
      case "/dashboard":
        return <ComponentsHub />;
      default:
        return <div>Page not found</div>;
    }
  };

  return <div className="container mx-auto p-4">{renderContent()}</div>;
}
