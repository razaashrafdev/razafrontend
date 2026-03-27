import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { fetchMe } from "@/lib/api";
import { getAuthToken, clearAuthToken } from "@/lib/authToken";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    fetchMe(token)
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        clearAuthToken();
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
