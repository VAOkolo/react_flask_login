import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import AuthWrapper from "../components/AuthWrapper";
import Layout from "../components/Layout";

const Logout = () => {
  const { setUser } = useUserContext();

  useEffect(() => {
    setUser(null);
  }, [setUser]);

  return (
    <AuthWrapper>
      <Layout>
        <h3>Logging out...</h3>
      </Layout>
    </AuthWrapper>
  );
};

export default Logout;
