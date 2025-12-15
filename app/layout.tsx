import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "../components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased bg-amber-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="grow">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
