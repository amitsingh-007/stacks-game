import AppNavBar from "@/components/AppNavBar";
import { RootProviders } from "@/providers/RootProvider";
import NextHeaders from "@/utils/headers";
import clsx from "clsx";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const font = DM_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Stacks Game",
  description: "Simple single player stacks game",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextHeaders = new NextHeaders(await headers());

  return (
    <html lang="en" className="dark">
      <body className={font.className}>
        <RootProviders deviceType={nextHeaders.getDeviceType()}>
          <main
            className={clsx(
              "flex flex-col h-svh text-foreground bg-background font-sans",
              font.variable
            )}
          >
            <AppNavBar />
            <div className="container mx-auto flex-1">{children}</div>
          </main>
        </RootProviders>
      </body>
    </html>
  );
}
