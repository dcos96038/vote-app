import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/providers/auth-provider";
import { getSession } from "@/services/auth/server";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <AuthProvider accessToken={session.data.session?.access_token || ""}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
