import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Citizen Service Portal | Government Services Made Easy",
  description: "Access government services easily and securely. Designed for all citizens with enhanced accessibility features.",
  keywords: "government services, digital services, citizen portal, e-governance, online services, government portal",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#1d4ed8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1d4ed8" />
        {/* Accessibility meta tags */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Skip to main content
        </a>
        
        <AuthProvider>
          <Header />
          {/* Main content wrapper */}
          <main id="main-content" className="flex-grow" tabIndex="-1">
            {children}
          </main>
        </AuthProvider>
        <Toaster position="top-center" closeButton richColors />
      </body>
    </html>
  );
}
