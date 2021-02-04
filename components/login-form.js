import { useDispatch } from "react-redux";

import { getUser } from "../lib/slices/dataTestSlice";
import useLoginForm from "../lib/useLoginForm";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = useLoginForm({
    username: "",
    password: "",
  });

  return (
    <form onSubmit={handleSubmit((data) => dispatch(getUser(data)))}>
      <h3>Login to Photo Album</h3>
      <label htmlFor="UsernameText">
        Username or Email:
        <input type="text" name="username" id="usernameText"></input>
      </label>
      <br />
      <label htmlFor="passwordText">
        Password:
        <input type="text" name="password" id="passwordText"></input>
      </label>
      <br />
      <button type="submit">Login Now</button>
      <br />
    </form>
  );
};

export default LoginForm;
