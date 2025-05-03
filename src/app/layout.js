import { playfair, openSans } from "@/lib/fonts";
import "../styles/globals.css";
import { Providers } from "./providers"; // Import the SessionProvider wrapper

export const metadata = {
  title: "Brewify - Watch It Brew. Taste It Live.",
  description:
    "Freshly roasted coffee beans from around the world, with same-day roasting options.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <body>
        <Providers>{children}</Providers> {/* Wrap children with Providers */}
      </body>
    </html>
  );
}

