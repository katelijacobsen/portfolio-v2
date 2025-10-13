import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import PillNav from "./components/PillNav";

export const metadata: Metadata = {
  title: "Katja Mähleke",
  description:
    "Hi! I’m Katja Mähleke, a multimedia designer from KEA (Copenhagen School of Design and Technology) passionate about creating intuitive, accessible, and user-friendly digital experiences. I specialize in frontend development and UI/UX, blending modern technologies with strong design principles.",
  authors: [{ name: "Katja Mähleke", url: "https://katjajacobsen.dk" }],
  creator: "Katja Mähleke",
  publisher: "Katja Mähleke",
  keywords: [
    "Katja Mähleke",
    "Multimedia Designer",
    "Frontend Developer",
    "UI/UX Designer",
    "Accessible Web Design",
    "KEA Copenhagen",
    "Digital Design Portfolio",
    "React",
    "Next.js",
  ],
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://katjajacobsen.dk"),
  openGraph: {
    title: "Katja Mähleke – Multimedia Designer & Frontend Developer",
    description:
      "Portfolio of Katja Mähleke – specializing in intuitive UI/UX and modern frontend development with a strong foundation in accessibility and design thinking.",
    url: "https://katjajacobsen.dk",
    siteName: "Katja Mähleke",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-dark">
        <PillNav/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
