import { getAuth } from "@/actions/auth/user";
import { Header } from "@/components/header";
import "./../globals.scss";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuth();

  return (
    <main className="w-full relative">
      <Header user={auth?.user ?? null} />
      {children}
      {/* <Footer /> */}
    </main>
  );
}
