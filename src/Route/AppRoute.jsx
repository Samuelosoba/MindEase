import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Nav from "../Components/Nav";
import Home from "../Pages/Home";
import Footer from "../Components/Footer";
import AuthPage from "../Pages/Auth";
import { DashboardLayout } from "../Components/User/DashboardLayout"; 
import { DummyPage } from "../Pages/User/DummyPAge";

import UserDashboard from "../Components/User/UserDashboard";

const Layout = ({ children }) => {
  const location = useLocation();

  // ✅ Show Navbar & Footer only on selected routes
  const showLayout = ["/", "/about", "/contact-us", "/discover"].includes(
    location.pathname
  );
  return (
    <>
      {showLayout && <Nav />}

      <main>{children}</main>
      {showLayout && <Footer />}
    </>
  );
};
export default function AppRoute() {
  return (
    <div className="">
      <Router>
        <Routes className="">
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="auth" element={<AuthPage />} />
          {/* User */}
          <Route path="/user/*" element={<UserDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
