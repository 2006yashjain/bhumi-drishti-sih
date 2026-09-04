import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhumi Drishti | Intelligent Land Acquisition Management",
  description: "Bhumi Drishti brings land acquisition project data, lifecycle monitoring, risk intelligence, GIS visualization, and corrective actions into one unified platform.",
};

import { ToastProvider } from "@/components/ui/ToastProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-slate-900 bg-slate-50 antialiased min-h-screen flex flex-col">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
