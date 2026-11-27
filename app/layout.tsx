import type { Metadata } from "next";

import { getLibraryNavigation } from "@/components/library/library-layout";

import { Navbar } from "@/components/site/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { cn } from "cn";

import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", fontVariables)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar componentNavigation={getLibraryNavigation("components")} blockNavigation={getLibraryNavigation("blocks")} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
