"use client";
import { GoCopy } from "react-icons/go";
import { useState } from "react";

import Button from "./Button";
const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "katjamaehleke98@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer
      id="contact-information"
      className="pixel-footer rounded-t-lg grid grid-cols-3 grid-rows-[auto_auto_auto] "
    >
      <div className="pixel-me"></div>
      <div className="flex items-end gap-small p-large row-start-3">
        <p>katjamaehleke98@gmail.com</p>
        <button onClick={copyEmail}>
          <GoCopy />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
