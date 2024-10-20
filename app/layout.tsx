import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./context/theme";
import TopNav from "@/components/ui/nav/top-nav";
import { ClerkProvider } from "@clerk/nextjs";
import { BusinessProvider } from "./context/business";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Business Directory App",
  description: "Denmark Local Business Directory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div
              className=" fixed inset-0 z-[-1] bg-cover bg-center  bg-no-repeat opacity-10 transition-opacity duration-300"
              style={{
                backgroundImage: `url('/images/hero.png')`,
              }}
            />
            <BusinessProvider>
              <header className="fixed top-0 left-0 right-0 z-50 opacity-90">
                <TopNav />
              </header>
              <main className="mt-20 md:mt-10 relative">{children}</main>
            </BusinessProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
