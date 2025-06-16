import React from "react";
import Button from "./Button";

function Header() {
  return (
    <nav className="py-10 backdrop-blur-xl fixed w-full flex justify-end px-large z-100">
        <Button text="Menu" w="w-auto" />
    </nav>
  );
}

export default Header;
