import { createContext, useEffect, useState } from "react";
import { User } from "../hooks/useUser";

const AuthContext = createContext({
  user: null,
  setUser: () => {}
});

// Creamos un componente proveedor
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // hydrate on mount
    const user  = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null;
    if (user || user!=="") {
      setUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };