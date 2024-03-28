import { Navbar } from "@/components/ui/navbar";
import { getUser } from "@/services/auth/server";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto min-h-screen max-w-screen-lg py-2">
      <Navbar />
      <div className="px-4 py-8">{children}</div>
    </main>
  );
}
