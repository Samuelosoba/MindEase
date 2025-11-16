import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
} from "lucide-react";

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/user" },
    { icon: Receipt, label: "MindEase Ai Assistant", path: "/user/assistant" },
    { icon: Wallet, label: "Budgets", path: "/user/budgets" },
    { icon: PiggyBank, label: "Savings Goals", path: "/goals" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: CreditCard, label: "Subscriptions", path: "/subscriptions" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: HelpCircle, label: "Help Center", path: "/help" },
    { icon: Settings, label: "Settings", path: "/settings" },
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
        className={`fixed top-0 left-0 h-full bg-white border-r border-[#FFD700] z-50
          transition-all duration-300
          ${isCollapsed ? "w-16" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <span className="text-[#FFD700] font-bold text-lg">B</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Samuel</p>
                <p className="text-sm text-gray-500">Free Plan</p>
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
                    } px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#FFD700] text-black font-semibold border-l-4 border-black"
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
            <button className="w-full flex items-center justify-center space-x-2 bg-[#FFD700] text-black py-2 rounded-lg font-semibold hover:opacity-90 transition">
              <Star size={18} />
              <span>Upgrade to Pro</span>
            </button>
          </div>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`flex ${
              isCollapsed ? "justify-center" : "items-center space-x-3"
            } px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full`}
          >
            <LogOut size={20} />
            <span
              className={`font-medium transition-opacity duration-200 ${
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
