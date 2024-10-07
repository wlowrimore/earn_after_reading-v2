import { DashboardHeader } from "../../components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex mx-auto p-12">
      <main className="w-full flex mx-auto p-4">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}
