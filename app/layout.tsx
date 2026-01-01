import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ReducedMotionProvider } from "@/components/reduced-motion-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

const estedad = localFont({
  src: [
    {
      path: "../public/fonts/Estedad/Estedad-Thin[@mimvid].ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Estedad/Estedad-ExtraLight[@mimvid].ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Estedad/Estedad-Light[@mimvid].ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Estedad/Estedad-Regular[@mimvid].ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Estedad/Estedad-Medium[@mimvid].ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Estedad/Estedad-SemiBold[@mimvid].ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Estedad/Estedad-Bold[@mimvid].ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Estedad/Estedad-ExtraBold[@mimvid].ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Estedad/Estedad-Black[@mimvid].ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-estedad",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mano Computer Studio",
  description: "Interactive simulator for Morris Mano's Basic Computer architecture",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${estedad.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReducedMotionProvider>
            {children}
            <Toaster />
          </ReducedMotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
