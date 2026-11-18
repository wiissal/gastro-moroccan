import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
 import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/data/site";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Only the italic, used for accent words in headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
   metadataBase: new URL(SITE.url),
  title: {
    default: "Moroccan Gastronomy",
    template: "%s . Moroccan Gastronomy",
  },
  description:
    "Moroccan recipes, culinary traditions and stories from the Moroccan table.",
};
export default function RootLayout({ children }) {
  // suppressHydrationWarning: browser extensions often add attributes to <html>
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}