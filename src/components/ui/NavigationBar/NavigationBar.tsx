import React from "react";
import {
  NavActionContainer,
  NavBarContainer,
  NavHeader,
} from "./NavigationBar.styles";
import Tab from "@/components/ui/Tab/Tab";
import { IssueOpenedIcon, RepoIcon } from "@primer/octicons-react";

const NavigationBar: React.FC = () => {
  return (
    <NavBarContainer>
      <NavHeader>
        <RepoIcon size={16} aria-hidden="true"/>
        <span>facebook / </span>
        <strong>react</strong>
      </NavHeader>
      <NavActionContainer aria-label='Issue Navigation'>
        <Tab href='/'>
          <IssueOpenedIcon size={16} aria-hidden='true' />
          <span>Issues</span>
        </Tab>
      </NavActionContainer>
    </NavBarContainer>
  );
};

export default NavigationBar;
