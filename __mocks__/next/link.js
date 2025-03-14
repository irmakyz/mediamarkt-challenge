import React from "react";

const MockLink = ({ href, children }) => {
  return React.cloneElement(children, { href });
};

export default MockLink;