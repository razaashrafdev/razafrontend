import { useEffect } from "react";
import { initAuthSession } from "@/lib/authToken";

/** Restores the JWT expiry timer after refresh and logs out when the token expires. */
const AuthSessionManager = () => {
  useEffect(() => {
    initAuthSession();
  }, []);

  return null;
};

export default AuthSessionManager;
