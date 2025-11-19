import React from "react";
import AppRoute from "./Route/AppRoute";
import { AuthProvider } from "./contexts/AuthProvider";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </div>
  );
}
