import React, { useEffect, useState } from "react";
import Logo from "../assets/MindEase.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [isFeaturesActive, setIsFeaturesActive] = useState(false);

  // Detect scroll and update active states for #features
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (location.pathname === "/") {
        const features = document.getElementById("features");
        if (features) {
          const rect = features.getBoundingClientRect();
          setIsFeaturesActive(rect.top < 200 && rect.bottom > 200);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Smooth-scroll function EVEN when navigating from another route
  const goToFeatures = () => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById("features");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  const activeClass = "text-[#1560B7] font-semibold";

  return (
    <div
      className={`fixed left-0 top-0 w-full z-10 transition-all duration-300 ${
        isScrolled ? "shadow-md bg-white" : "bg-white"
      }`}
    >
      <nav className="flex justify-between items-center py-6 px-8 md:px-16">
        {/* Logo */}
        <NavLink className="flex items-center gap-2 cursor-pointer" to="/">
          <img
            src={Logo}
            alt="MindEase Logo"
            className="w-10 h-10 md:w-14 md:h-14 object-contain"
          />
          <h1 className="text-[#1560B7] text-3xl font-semibold">MindEase</h1>
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10 text-gray-700 font-medium">
          {/* OUR FEATURES */}
          <button
            onClick={goToFeatures}
            className={`cursor-pointer transition p-4 ${
              isFeaturesActive ? activeClass : "hover:text-[#1560B7]"
            }`}
          >
            Our Features
          </button>

          {/* ABOUT PAGE */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `cursor-pointer transition p-4 ${
                isActive ? activeClass : "hover:text-[#1560B7]"
              }`
            }
          >
            About MindEase
          </NavLink>

          {/* USER PAGE */}
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `py-4 px-4 border-2 rounded-4xl ${
                isActive
                  ? "border-[#1560B7] text-[#1560B7] font-semibold"
                  : "border-[#1560B7] hover:bg-[#1560B7] hover:text-white"
              }`
            }
          >
            Find Your Rhythm
          </NavLink>
        </ul>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden cursor-pointer z-40 text-2xl"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute left-0 w-full top-0 flex flex-col gap-6 bg-blue-100/80 backdrop-blur-md py-8 items-center z-30">
          <button
            className={`text-[#1560B7] ${
              isFeaturesActive ? "font-semibold" : ""
            }`}
            onClick={() => {
              goToFeatures();
              setIsOpen(false);
            }}
          >
            Our Features
          </button>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-[#1560B7] ${isActive ? "font-semibold" : ""}`
            }
            onClick={() => setIsOpen(false)}
          >
            About MindEase
          </NavLink>

          <NavLink
            to="/user"
            className={({ isActive }) =>
              `text-[#1560B7] border-2 py-2 px-4 border-[#1560B7] rounded-4xl ${
                isActive ? "font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Find Your Rhythm
          </NavLink>
        </div>
      )}
    </div>
  );
}
