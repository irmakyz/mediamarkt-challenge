import React from "react";
import Banner from "../ui/Banner/Banner";
import { LayoutProps } from "./types";
import NavigationBar from "../ui/NavigationBar/NavigationBar";
import { Container } from "./Layout.styles";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Banner />
      <main>
        <NavigationBar />
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Layout;
