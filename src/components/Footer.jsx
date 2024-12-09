import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="px-5 py-5 sm:px-10">
      <div className="screen-max-width">
        <div>
          <p className="text-xs font-semibold text-gray">
            More ways to shop:{" "}
            <span className="underline cursor-not-allowed text-blue">Find and Apple Store</span>
            {" "}
            or <span className="underline cursor-not-allowed text-blue">other retailer</span>{" "}near
            you.
          </p>
          <p className="text-xs font-semibold text-gray">
            Or call (800)-123-4567
          </p>
        </div>

        <div className="w-full my-5 bg-neutral-700 h-[1px]" />

        <div className="flex flex-col justify-between lg:flex-row md:items-center">
          <p className="text-xs font-semibold text-gray">
            Copyright © 2024 Apple Inc. All rights reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={link} className="text-xs font-semibold text-gray">
                {link}{" "}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
