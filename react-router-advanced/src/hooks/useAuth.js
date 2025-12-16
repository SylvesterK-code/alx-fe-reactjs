// src/hooks/useAuth.js
import { isAuthenticated } from "../utils/auth";

const useAuth = () => {
  return isAuthenticated();
};

export default useAuth;
