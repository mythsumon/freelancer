import { Navbar } from "../components/nav/Navbar";
import { Footer } from "../components/footer/Footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  hideFooter?: boolean;
}

export const DefaultLayout = ({ children, hideNav = false, hideFooter = false }: DefaultLayoutProps) => {
  return (
    <div className="app-shell">
      {!hideNav && <Navbar />}
      <main className="app-main">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};