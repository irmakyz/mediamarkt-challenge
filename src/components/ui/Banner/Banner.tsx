import React from "react";
import { BannerContainer } from "./Banner.styles";
import Image from "next/image";

const Banner: React.FC = () => {
  return (
    <BannerContainer role='banner'>
      <Image src='/logo.svg' alt='Logo' width={32} height={32} />
    </BannerContainer>
  );
};

export default Banner;
