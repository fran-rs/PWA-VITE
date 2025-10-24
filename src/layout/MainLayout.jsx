import { useState } from "react";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";

export default function MainLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setMenuOpen(true)} />
      <SidebarMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div style={{ marginTop: "60px", padding: "16px" }}>{children}</div>
    </>
  );
}
