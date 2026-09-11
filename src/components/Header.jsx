import React from "react";
import logo from "/logo.png?url";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <div className="pagetitle">
          <div className="flex mx-auto px-4">
            <Link to="/" className="mx-auto">
              <img src={logo} className="headerLogo mx-auto w-[250px]" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
