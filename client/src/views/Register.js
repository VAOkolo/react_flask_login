import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Layout>
      <h1>New User</h1>
      <p>Create a new account.</p>

      <form>
        <TextInput type="text" label="Username" />
        <TextInput type="password" label="Password" />
        <TextInput type="password" label="Confirm Password" />

        <Button type="submit" className="mt-3">
          Register
        </Button>
      </form>

      <p>
        Already registered? <Link to="/">Log in.</Link>
      </p>
    </Layout>
  );
};

export default Register;
