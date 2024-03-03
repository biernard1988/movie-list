import { Roboto } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Movie List",
  description: "Project created to studies purpose only",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
