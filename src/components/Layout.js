import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import NavBar from "./NavBar";
import { Container } from "@nextui-org/react";

const Layout = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <Container css={{ boxSizing: "border-box", maxW: "100%" }}>
      {user ? <NavBar></NavBar> : <nav></nav>}
      <main>{children}</main>
      <footer></footer>
    </Container>
  );
};

export default Layout;
