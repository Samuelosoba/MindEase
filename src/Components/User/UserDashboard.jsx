import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./Siderbar";
import Dashboard from "../../Pages/User/Dashboard";
import { AIChatbotPage } from "../../Pages/User/AiChatBotPage";
import Settings from "../../Pages/User/Settings";
import SleepSupport from "../../Pages/User/SleepSupport";

const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ====== MOBILE HAMBURGER BUTTON ====== */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
      >
        ☰
      </button>

      {/* ====== SIDEBAR (responsive) ====== */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* ====== MAIN CONTENT ====== */}
      <div className="flex-1 p-6 lg:ml-64 transition-all duration-300">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assistant" element={<AIChatbotPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sleep-support" element={<SleepSupport />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
