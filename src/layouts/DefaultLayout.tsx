import { Navbar } from "../components/nav/Navbar";
import { Footer } from "../components/footer/Footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  hideFooter?: boolean;
}

export const DefaultLayout = ({ children, hideNav = false, hideFooter = false }: DefaultLayoutProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!hideNav && <Navbar />}
      <main style={{ flex: 1 }}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};