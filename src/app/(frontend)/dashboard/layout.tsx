import { getAuth } from "@/actions/auth/user";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuth();

  if (!auth?.user) {
    return redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          email: auth.user.email,
          name: auth.user.name,
        }}
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
