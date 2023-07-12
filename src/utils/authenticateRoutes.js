import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Container, Loading } from "@nextui-org/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

//funcion que recibe un componente por parametro el cual es rederizado si el usuario esta autenticado
//si no es el caso lo redirige a la ruta espeficificada en options o a /usuarios/login
const authenticateRoute = (Component = null, options = {}) => {
  const AuthenticatedRoute = (props) => {
    const { user } = useAuth();
    const { getItem } = useLocalStorage();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
      if (getItem("user")) {
        setLoading(false);
      } else {
          Router.push(options.pathAfterFailure || "/login");
      }
    }, [user]);

    if (loading)
      return (
        <Container display="flex" justify="center" alignItems="center" fluid css={{height:"100%"}}>
          <Loading css={{ flex: 1 }} />
        </Container>
      );
    return <Component {...props} />;
  };

  return AuthenticatedRoute;
};

export default authenticateRoute;
