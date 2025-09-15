import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "HackYourFuture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="pageWrapper">
          <main className="mainContent">
            <Navbar />
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
