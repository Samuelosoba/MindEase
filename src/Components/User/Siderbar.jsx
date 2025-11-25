import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/MindEase.png";
import Stress from "../../assets/Stress.png";
import {
  LayoutDashboard,
  MessageSquareDot,
  MoonStar,
  Hourglass,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/user" },
    {
      icon: MessageSquareDot,
      label: "MindEase Ai Assistant",
      path: "/user/assistant",
    },
    { icon: MoonStar, label: "Sleep Support", path: "/user/sleep-support" },
    {
      icon: Hourglass,
      label: "Time Management",
      path: "/user/time-management",
    },
    {
      icon: HeartHandshake,
      label: "Stress Management",
      path: "/user/stress-management",
    },
  ];

  const handleLogout = () => navigate("/");

  // Collapse automatically on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsCollapsed(true);
      else setIsCollapsed(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-100 shadow-md z-50
          transition-all duration-300 ease-in-out
          flex flex-col
          ${isCollapsed ? "w-16" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img src={Logo} className="w-10 h-10 object-contain" alt="logo" />
              <p className="font-bold text-gray-800 text-lg">MINDEASE</p>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-200 transition"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 overflow-y-auto p-3 mt-2">
          <ul
            className={`space-y-1 ${
              isCollapsed ? "items-center flex flex-col" : ""
            }`}
          >
            {menuItems.map((item) => (
              <li key={item.path} className="w-full">
                <NavLink
                  to={item.path}
                  end={item.path === "/user"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-all
                      ${isCollapsed ? "justify-center" : ""}
                      ${
                        isActive
                          ? "bg-blue-100 text-blue-900 font-semibold border-l-4 border-blue-700"
                          : "text-gray-700 hover:bg-gray-200"
                      }
                    `
                  }
                >
                  <item.icon
                    size={isCollapsed ? 24 : 22} // Bigger icon when collapsed
                    className="min-w-[26px]" // Prevent shrinking on mobile
                  />

                  <span
                    className={`whitespace-nowrap transition-all duration-200 ${
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

        {/* SETTINGS BUTTON */}

        <div className="p-3">
          <button
            onClick={() => navigate("/user/settings")}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-3 rounded-lg hover:bg-gray-200 transition font-semibold`}
          >
            <Settings size={isCollapsed ? 25 : 22} />
            {!isCollapsed && <span>Settings</span>}
          </button>
        </div>

        {/* LOGOUT */}
        <div className="border-t border-gray-200 p-3  mb-2">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-3 w-full rounded-lg 
    hover:bg-red-50 transition ${
      isCollapsed ? "justify-center px-0 py-0" : ""
    }`}
          >
            <p>Hi</p>

            <span
              className={`font-medium transition-all ${
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              {user.firstName}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
