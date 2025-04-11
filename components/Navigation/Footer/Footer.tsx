"use client";

import React from "react";
import clsx from "clsx";
import { bgColors } from "@/constants/colors";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterCredits from "./FooterCredits";

const Footer = () => {
  return (
    <footer className={clsx("flexCenter", bgColors.primary)}>
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between relative z-30 py-4">
          <FooterBrand />
          <div className="lg:hidden mb-5" />
          <FooterLinks />
          <FooterLinks mobile />
        </div>
      </div>
      <FooterCredits />
    </footer>
  );
};

export default React.memo(Footer);
