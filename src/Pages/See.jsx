// MindEase Dashboard Layout + Sidebar + Chatbot Page
// This file contains the full layout structure, sidebar component, routes setup,
// and a replicated Chatbot UI based on your Figma design.

import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { FiMessageCircle, FiMoon, FiSun } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

// --------------------------------------
// Sidebar Component
// --------------------------------------
export const Sidebar = () => {
  const menu = [
    { label: "Dashboard", path: "/" },
    { label: "MindEase AI Assistant", path: "/assistant" },
    { label: "Sleep Support", path: "/sleep" },
    { label: "Time Management", path: "/time" },
    { label: "Stress Management", path: "/stress" },
  ];

  return (
    <aside className="w-[260px] min-h-screen bg-white border-r p-5 flex flex-col gap-8">
      <h1 className="text-xl font-bold text-blue-700 mb-4">MindEase</h1>
      <nav className="flex flex-col gap-3">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition ${isActive ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t pt-4">
        <NavLink
          to="/settings"
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

// --------------------------------------
// Layout Wrapper
// --------------------------------------
export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-[#F8FBFF] w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto">{children}</main>
    </div>
  );
};

// --------------------------------------
// Chatbot Page (replicates Figma exactly)
// --------------------------------------
export const AIChatbotPage = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-xl font-bold text-blue-700 mb-6">MindEase</h2>

      <div className="w-full bg-green-100 text-green-800 p-4 rounded-xl inline-block mb-5 text-sm">
        Hi there! I'm MindEase. Your AI Assistant here to help you. How are you feeling today?
      </div>

      <div className="text-left mb-4 font-semibold text-gray-700">Quick Suggestions</div>

      <div className="flex gap-3 flex-wrap justify-center mb-6">
        {[
          "Breathing Exercises",
          "Study Tips",
          "Sleep Optimization",
          "Stress Relief Tips",
        ].map((item, index) => (
          <button
            key={index}
            className="border px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-sm shadow-sm"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center border rounded-full px-4 py-3 bg-white shadow-sm">
        <input
          type="text"
          placeholder="What's on your mind today?"
          className="flex-1 outline-none text-sm"
        />
        <FiMessageCircle className="text-blue-600 text-xl" />
      </div>

      <p className="text-gray-400 text-xs mt-4">
        Your conversations are secured by end-to-end encryption.
      </p>
    </div>
  );
};

// --------------------------------------
// Dummy Pages
// --------------------------------------
export const DummyPage = ({ title }) => (
  <div className="text-2xl font-semibold text-gray-600">{title} Page Coming Soon...</div>
);

// --------------------------------------
// App Routing
// --------------------------------------
export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <DummyPage title="Dashboard" />
            </DashboardLayout>
          }
        />

        <Route
          path="/assistant"
          element={
            <DashboardLayout>
              <AIChatbotPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/sleep"
          element={
            <DashboardLayout>
              <DummyPage title="Sleep Support" />
            </DashboardLayout>
          }
        />

        <Route
          path="/time"
          element={
            <DashboardLayout>
              <DummyPage title="Time Management" />
            </DashboardLayout>
          }
        />

        <Route
          path="/stress"
          element={
            <DashboardLayout>
              <DummyPage title="Stress Management" />
            </DashboardLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <DummyPage title="Settings" />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

## File Structure Breakdown with Protected Routes

```
src/
  components/
    Sidebar/
      Sidebar.jsx
      Sidebar.css
  layout/
    DashboardLayout.jsx
  pages/
    ChatbotPage.jsx
    SleepSupportPage.jsx
    TimeManagementPage.jsx
    StressManagementPage.jsx
    SettingsPage.jsx
    Login.jsx
  routes/
    ProtectedRoute.jsx
  App.jsx
  main.jsx
```

### ProtectedRoute.jsx
```jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

### DashboardLayout.jsx (updated)
```jsx
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
```

### App.jsx (updated with routes)
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import ChatbotPage from "./pages/ChatbotPage";
import SleepSupportPage from "./pages/SleepSupportPage";
import TimeManagementPage from "./pages/TimeManagementPage";
import StressManagementPage from "./pages/StressManagementPage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ChatbotPage />} />
          <Route path="sleep-support" element={<SleepSupportPage />} />
          <Route path="time-management" element={<TimeManagementPage />} />
          <Route path="stress-management" element={<StressManagementPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Sidebar.jsx
```jsx
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">MindEase</h2>

      <nav>
        <NavLink to="/" end>MindEase AI Assistant</NavLink>
        <NavLink to="/sleep-support">Sleep Support</NavLink>
        <NavLink to="/time-management">Time Management</NavLink>
        <NavLink to="/stress-management">Stress Management</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </div>
  );
}
```



