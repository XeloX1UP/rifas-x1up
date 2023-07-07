import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Dosis } from "next/font/google";
import { Metadata } from "next";
import styles from "@/components/modules/rootLayout.module.css";
import NavBar from "@/components/navBar";
const robotoMono = Dosis({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${robotoMono.className} ${styles.body}`}>
        <header>
          <NavBar />
        </header>
        {children}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  description: "Created by XeloX1UP",
  title: {
    template: "%s | Rifas X1UP",
    default: "Rifas X1UP",
  },
};
