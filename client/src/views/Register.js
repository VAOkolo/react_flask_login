import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import * as api from "../api";

const Register = () => {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [registered, setRegistered] = useState(false);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords must match.");
      return;
    }

    setPending(true);
    const res = await api.register({ username, password });
    setRegistered(res.success);
    setErrorMessage(res.error || null);
    setPending(false);
  };

  const verifyUser = useCallback(async () => {
    setPending(true);
    const res = await api.login({ username, password });
    setErrorMessage(res.error || null);
    setUser(res.token || null);
  }, [username, password, setUser]);

  useEffect(() => {
    // If succesfully registered, immediately try to log user in.
    if (registered) {
      verifyUser();
    }
  }, [registered, verifyUser]);

  useEffect(() => {
    // Navigate to step 1 after user has been verified.
    if (registered && user.username) {
      navigate("/step/1");
    }
  }, [user, registered, navigate]);

  return (
    <Layout>
      <h1>New User</h1>
      <p>Create a new account.</p>

      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextInput
          type="password"
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {errorMessage ? (
          <div className="text-red-700">{errorMessage}</div>
        ) : null}

        <Button
          disabled={!username || !password || !confirmPassword}
          type="submit"
          className="mt-3"
        >
          {pending ? <Spinner className="w-4 h-4" /> : null} Register
        </Button>
      </form>

      <p>
        Already registered? <Link to="/">Log in.</Link>
      </p>
    </Layout>
  );
};

export default Register;
