// components/Header.tsx
import React from "react";
import LogoGroup from "./LogoGroup";
import SiteTitle from "./SiteTitle";
import Description from "./Description";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="bg-">
      <div className="w-full px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <LogoGroup />
          <SiteTitle />
        </div>
        <Description />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
