"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { DeviceDetectProvider } from "./DeviceDetectProvider";

export function RootProviders({
  children,
  deviceType,
}: {
  children: React.ReactNode;
  deviceType: string | undefined;
}) {
  return (
    <DeviceDetectProvider deviceType={deviceType}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </DeviceDetectProvider>
  );
}
