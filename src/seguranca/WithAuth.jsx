import { Navigate } from "react-router-dom";
import { getToken } from "./Autenticacao";

const WithAuth = (Component) => {

  const AuthRoute = () => {    
    const isAuth = getToken() ? true : false;
    if (isAuth) {
      return <Component />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return AuthRoute;
};

export default WithAuth;