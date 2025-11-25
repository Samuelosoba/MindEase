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

import UserDashboard from "../Components/User/UserDashboard";
import SelectionPage from "../Pages/User/SelectionPage";
import ScrollToTop from "../Components/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";

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
        <ScrollToTop />
        <Routes className="">
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="selection"
            element={
              <ProtectedRoute>
                <SelectionPage />
              </ProtectedRoute>
            }
          />
          <Route path="auth" element={<AuthPage />} />
          {/* User */}
          <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
