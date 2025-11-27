import React, { useEffect, useState } from "react";
import Logo from "../assets/MindEase.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div
      className={`fixed left-0 top-0 w-full z-10 transition-all duration-300  ${
        isScrolled ? "shadow-md bg-white" : "bg-white"
      }`}
    >
      <nav className="flex justify-between items-center py-6  w-full mx-auto px-8 md:px-16">
        <NavLink className="flex items-center gap-2 cursor-pointer" to="/">
          <img
            src={Logo}
            alt="MindEase Logo"
            className="w-10 h-10 md:w-14 md:h-14 object-contain"
          />

          <h1 className="text-[#1560B7] text-3xl font-semibold">MindEase</h1>
        </NavLink>

        {/* destop */}
        <ul className="hidden md:flex gap-10 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-[#1560B7] transition p-4">
            Our Features
          </li>
          <li className="cursor-pointer hover:text-[#1560B7] transition p-4">
            Resources
          </li>
          <li className="cursor-pointer hover:text-[#1560B7] transition p-4">
            About MindEase
          </li>
          <button
            className="cursor-pointer py-2 px-4 border-[#1560B7] border-3 rounded-4xl transition"
            onClick={() => navigate("/user")}
          >
            Find Your rhythm
          </button>
        </ul>

        {/* Mobile */}
        <div
          className="md:hidden cursor-pointer z-40 text-2xl"
          onClick={() => toggleMenu()}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden absolute left-0 w-full top-0 flex flex-col gap-6 bg-blue-100/80 backdrop-blur-md py-8 items-center">
          <NavLink className="text-[#1560B7]" onClick={() => setIsOpen(false)}>
            Our Features
          </NavLink>
          <NavLink className="text-[#1560B7]" onClick={() => setIsOpen(false)}>
            About MindEase
          </NavLink>
          <NavLink className="text-[#1560B7]" onClick={() => setIsOpen(false)}>
            About EaseMind
          </NavLink>
          <NavLink
            className="text-[#1560B7] border-2 py-2 px-4 border-[#1560B7] rounded-4xl"
            onClick={() => {
              setIsOpen(false);
            }}
            to="/user"
          >
            Find Your Rhythm
          </NavLink>
        </div>
      )}
    </div>
  );
}
