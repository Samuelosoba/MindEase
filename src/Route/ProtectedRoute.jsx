import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!token) return <Navigate to="/auth" />;

  return children;
}
