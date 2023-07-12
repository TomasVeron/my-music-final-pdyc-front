import { useAuth } from "../hooks/useAuth";
import { Button } from "@nextui-org/react";
import { getAuth, signOut } from "firebase/auth";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        logout();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Button color="error" rounded flat light auto onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
