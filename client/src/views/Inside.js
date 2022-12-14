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
        <h1>Welcome inside, {user.username}!</h1>

        {user ? (
          <div>
            {steps.map(({ key, description }) => {
              return (
                <div key={key} className="my-8">
                  <h2 className="my-4">{description}:</h2>
                  <div className="text-4xl font-light">{user[key]}</div>
                </div>
              );
            })}
          </div>
        ) : null}
      </Layout>
    </AuthWrapper>
  );
};

export default Inside;
