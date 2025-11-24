import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./Siderbar";
import Dashboard from "../../Pages/User/Dashboard";
import { AIChatbotPage } from "../../Pages/User/AiChatBotPage";
import Settings from "../../Pages/User/Settings";
import SleepSupport from "../../Pages/User/SleepSupport";
import TimeManagement from "../../Pages/User/TimeManagement";
import StressManagement from "../../Pages/User/StressManagement";
import { AcademicStressSolution } from "../../Pages/User/AcademicStressSolution";

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
          <Route path="/time-management" element={<TimeManagement />} />
          <Route path="/stress-management" element={<StressManagement />} />
          <Route
            path="/stress-management/academics"
            element={<AcademicStressSolution />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
