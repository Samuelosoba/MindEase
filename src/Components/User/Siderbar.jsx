import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/MindEase.png";
import Stress from "../../assets/Stress.png";
import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Receipt,
  Calendar,
  Bell,
  Briefcase,
  CreditCard,
  Folder,
  HelpCircle,
  Star,
  MessageSquareDot,
  MoonStar,
  Hourglass,
  HeartHandshake,
} from "lucide-react";

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/user" },
    {
      icon: MessageSquareDot,
      label: "MindEase Ai Assistant",
      path: "/user/assistant",
    },
    { icon: MoonStar, label: "Sleep Support", path: "/user/sleep-support" },
    { icon: Hourglass, label: "Time Management", path: "/goals" },
    { icon: HeartHandshake, label: "Stress Management", path: "/reports" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  // Auto collapse on small screens
  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ----- MOBILE OVERLAY ----- */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* ----- SIDEBAR ITSELF ----- */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 z-50
          transition-all duration-300
          ${isCollapsed ? "w-16" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <span className="">
                  {" "}
                  <img
                    src={Logo}
                    alt="MindEase Logo"
                    className="w-10 h-10 md:w-14 md:h-14 object-contain"
                  />
                </span>
              </div>
              <div>
                <p className="font-bold  text-gray-800">MINDEASE</p>
                {/* <p className="text-sm text-gray-500">Free Plan</p> */}
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight size={20} className="text-gray-600" />
            ) : (
              <ChevronLeft size={20} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4">
          <ul
            className={`${
              isCollapsed ? "flex flex-col items-center space-y-4" : "space-y-2"
            }`}
          >
            {menuItems.map((item) => (
              <li key={item.path} className="w-full">
                <NavLink
                  to={item.path}
                  end={item.path === "/user"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex ${
                      isCollapsed ? "justify-center" : "items-center space-x-3"
                    } px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#d4e2ef] text-black font-semibold border-l-6 border-[#1560B7]"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span
                    className={`font-medium transition-opacity duration-200 ${
                      isCollapsed
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Upgrade Button */}
        {!isCollapsed && (
          <div className="p-4">
            <button
              className="w-full flex space-x-2 px-2 text-black py-2 rounded-lg font-semibold hover:opacity-90 transition"
              onClick={() => {
                navigate("/user/settings");
              }}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </div>
        )}

        {/* Logout */}
        <div className="py-4 px-2 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`flex ${
              isCollapsed ? "justify-center" : "items-center space-x-3"
            } px-3 py-2 rounded-lg hover:bg-red-50 transition-colors w-full`}
          >
            <img src={Stress} alt="" className="h-12 w-12 rounded-full" />
            <span
              className={`font-medium transition-opacity duration-200 ${
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              Johnson
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
