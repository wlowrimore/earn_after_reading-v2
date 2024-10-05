import { Providers } from "./context/providers";
import { auth } from "../../auth";

import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Earn After Reading",
  description:
    "Transform everyday chores into exciting opportunities for your kids.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <Providers>
        <body className={raleway.className}>{children}</body>
      </Providers>
    </html>
  );
}
