import Navbar from './ui/navbar';
import Footer from './ui/footer';
import './ui/global.css'
import {inter} from '../app/ui/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased relative min-h-screen bg-white text-black`}>
        <Navbar />

        {/* ✅ Main content */}
        <main className="relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>

    
  );
}
