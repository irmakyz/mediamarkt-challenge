import React from "react";
import Link from "next/link";
import { TabProps } from "./types";
import { TabContainer } from "./Tab.styles";

const Tab: React.FC<TabProps> = ({ children, href }) => {
  return (
    <Link href={href} passHref>
      <TabContainer>{children}</TabContainer>
    </Link>
  );
};

export default Tab;
