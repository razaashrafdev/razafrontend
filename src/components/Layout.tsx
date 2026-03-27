import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 pt-24">
      <div className="mx-auto w-[95%] max-w-7xl">{children}</div>
    </main>
    <Footer />
    <FloatingButtons />
  </div>
);

export default Layout;
