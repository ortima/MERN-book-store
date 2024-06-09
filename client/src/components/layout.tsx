import { PropsWithChildren } from "react";
import Sidebar from "./sidebar";

interface LayoutProps extends PropsWithChildren {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</div>
    </div>
  );
};

export default Layout;
