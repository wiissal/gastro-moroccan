import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Moroccan Gastronomy- A Taste of Morocco",
  description:
    "Moroccan recipes, culinary traditions and stories from the Moroccan table.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}
          suppressHydrationWarning // browser extensions often add attributes to <html>
>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}