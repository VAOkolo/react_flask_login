import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import * as api from "../api";

const Login = () => {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const res = await api.login({ username, password });
    setErrorMessage(res.error || null);
    setPending(false);
    setUser(res.token);
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <h1>Welcome!</h1>
      <p>Log in with your username and password.</p>

      <form onSubmit={handleSubmit}>
        <TextInput
          id="floatingText"
          type="text"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          id="floatingPassword"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage ? (
          <div className="text-red-700">{errorMessage}</div>
        ) : null}

        <Button
          disabled={!username || !password || pending}
          type="submit"
          className="mt-3"
        >
          {pending ? <Spinner className="w-4 h-4" /> : null} Log In
        </Button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register.</Link>
      </p>
    </Layout>
  );
};

export default Login;
