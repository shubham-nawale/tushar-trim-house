import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "तुषार ट्रिम हाऊस | प्रीमियम ग्रूमिंग आणि हॅयरकट",
  description:
    "तुषार ट्रिम हाऊसमध्ये वेळ बुक करा. लाइव्ह उपलब्धता तपासा आणि आपल्या आवडीची वेळ नक्की करा.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "तुषार ट्रिम हाऊस | प्रीमियम ग्रूमिंग आणि हॅयरकट",
    description:
      "तुषार ट्रिम हाऊसमध्ये वेळ बुक करा. लाइव्ह उपलब्धता तपासा आणि आपल्या आवडीची वेळ नक्की करा.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mr" className={`${playfair.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0B0B0B] font-sans text-[#F5F2EA]">{children}</body>
    </html>
  );
}
