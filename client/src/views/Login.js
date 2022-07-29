import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Layout>
      <h1>Welcome!</h1>
      <p>Log in with your username and password.</p>

      <form>
        <TextInput id="floatingText" type="text" label="Username" />
        <TextInput id="floatingPassword" type="password" label="Password" />

        <Button type="submit" className="mt-3">
          Log In
        </Button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register.</Link>
      </p>
    </Layout>
  );
};

export default Login;
