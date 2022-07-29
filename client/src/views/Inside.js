import AuthWrapper from "../components/AuthWrapper";
import Layout from "../components/Layout";

const Inside = () => {
  return (
    <AuthWrapper>
      <Layout>
        <h1>Welcome inside!</h1>
      </Layout>
    </AuthWrapper>
  );
};

export default Inside;
