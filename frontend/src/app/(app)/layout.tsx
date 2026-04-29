import { AppSidebar } from "@/components/dashboard/app-sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
