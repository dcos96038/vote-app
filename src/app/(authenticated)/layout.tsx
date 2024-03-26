import { Navbar } from "@/components/ui/navbar";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen max-w-screen-lg mx-auto py-2">
      <Navbar />
      {children}
    </main>
  );
}
