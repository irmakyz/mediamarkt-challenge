import React from "react";
import Banner from "../ui/Banner/Banner";
import { LayoutProps } from "./types";
import NavigationBar from "../ui/NavigationBar/NavigationBar";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Banner />
      <main>
        <NavigationBar />
        {children}
      </main>
    </>
  );
};

export default Layout;
