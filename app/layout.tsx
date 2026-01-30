import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import Navbarfrom from "@/components/Navbar";
import Navbar from "@/components/Navbar";

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEVEVENT",
  description: "The center for all dev events you mustn't miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SchibstedGrotesk.variable} ${MartianMono.variable} antialiased min-h-screen`}>
        
<Navbar/>
<div className="h-64 absolute top-0 bottom-0 z-[-1] inset-0  w-full">
  <LightRays
    raysOrigin="top-center-offset"
    raysColor="#5dfeca"
    raysSpeed={0.5}
    lightSpread={0.9}
    rayLength={1.4}
    followMouse={true}
    mouseInfluence={0.02}
    noiseAmount={0.1}
    distortion={0.01}
    className="custom-rays"
    pulsating={false}
    fadeDistance={1}
    saturation={1}
/>
</div>
{children}
        {/* <div className="bg-red-600 absolute bottom-0 w-full text-center text-2xl text-white text-extrabold">footer</div> */}
      </body>
    </html>
  )
}
