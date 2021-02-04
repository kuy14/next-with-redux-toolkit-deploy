import cookie from "js-cookie";
import LoginPage from "../../pages/login";
import { useSelector } from "react-redux";

const requiredAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const userState = useSelector((state) => state.users.user);
    if (userState.length !== 0) {
      return <Component />;
    }
    return <LoginPage />;
  };

  return AuthenticatedComponent;
};

export default requiredAuth;
