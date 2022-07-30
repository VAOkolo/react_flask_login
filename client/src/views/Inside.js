import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import AuthWrapper from "../components/AuthWrapper";
import Layout from "../components/Layout";
import { steps } from "./Steps";

const Inside = () => {
  const { user } = useUserContext();

  // Check if any steps have not yet been completed.
  if (steps.some((step) => !user[step.key])) {
    return <Navigate to="/steps" />;
  }

  return (
    <AuthWrapper>
      <Layout>
        <h1>Welcome inside!</h1>

        {user
          ? steps.map(({ key, description }) => {
              return (
                <div key={key}>
                  <h2>{description}</h2>
                  <p className="text-6xl font-light">{user[key]}</p>
                </div>
              );
            })
          : null}
      </Layout>
    </AuthWrapper>
  );
};

export default Inside;
