"use client";
import { GoCopy } from "react-icons/go";
import { useState } from "react";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import Button from "./Button";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "katjamaehleke98@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <footer
      id="contact-information"
      className="pixel-footer relative flex flex-col items-center justify-end text-white border-t border-gray-600 overflow-hidden md:grid md:grid-cols-3 md:grid-rows-3"
    >
      <div className="pixel-me"></div>

      <div className="flex items-center gap-2 p-4 md:row-start-3 md:col-start-1 z-10">
        <p className="text-sm sm:text-base">{email}</p>
        <button
          onClick={copyEmail}
          className="p-1 hover:text-pink-500 transition-colors"
          aria-label="Copy email"
        >
          <GoCopy />
        </button>
        <span
          className={`ml-2 text-xs bg-pink-500 text-white px-2 py-[.2rem] rounded-sm transition-all duration-300 ease-in ${
            copied
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-2"
          }`}
        >
          Copied
        </span>
      </div>

      <div className="flex gap-6 md:justify-end justify-center z-10 md:row-start-3 md:col-start-3 ">
        <Button href="https://github.com/katelijacobsen" aria-label="GitHub">
          <BsGithub className="hover:text-pink-500 transition-colors"/>
        </Button>
        <Button href="https://www.linkedin.com" aria-label="LinkedIn">
          <BsLinkedin className="hover:text-pink-500 transition-colors"/>
        </Button>
        <Button href="https://www.instagram.com" aria-label="Instagram">
          <BsInstagram className="hover:text-pink-500 transition-colors"/>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;