import React from "react";
import Logo from "../assets/MindEase.png";
import { NavLink } from "react-router-dom";

const about = [
  { link: "Our Mission", to: "/" },
  { link: "Our Team", to: "/" },
  { link: "Research", to: "/" },
];
const resources = [
  { link: "Blog", to: "/" },
  { link: "Help Center", to: "/" },
  { link: "Privacy", to: "/" },
];
const partners = [
  { link: "Mental Health NGOs", to: "/" },
  { link: "University Partners", to: "/" },
  { link: "Become a partner", to: "/" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a315c] py-10 px-8 md:px-16">
      <div className="">
        {/* Logo and name */}
        <div className="flex items-center gap-2 mb-8">
          <NavLink to="/" className="cursor-pointer">
            <img
              src={Logo}
              alt="MindEase Logo"
              className="w-10 h-10 md:w-14 md:h-14 object-contain"
            />
          </NavLink>
          <h1 className="text-white text-3xl font-semibold">MindEase</h1>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <h2 className="font-semibold text-lg mb-3 text-white">About Us</h2>
            <ul className="space-y-2">
              {about.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className=" transition-colors text-white"
                  >
                    {item.link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="font-semibold text-lg mb-3 text-white ">
              Resources
            </h2>
            <ul className="space-y-2">
              {resources.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className=" transition-colors text-white"
                  >
                    {item.link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h2 className="font-semibold text-lg mb-3 text-white">Partners</h2>
            <ul className="space-y-2">
              {partners.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className="hover:text-gray text-white transition-colors"
                  >
                    {item.link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-white mt-10 border-t pt-4">
          © {new Date().getFullYear()} MindEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
