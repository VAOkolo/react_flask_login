import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Layout from "./Layout";
import Spinner from "./Spinner";

// Wrapper component to protect views that require authentication
const AuthWrapper = ({ children }) => {
  const { pending, user } = useUserContext();

  if (pending) {
    return (
      <Layout className="h-[90vh]">
        <div className="h-[100%] flex justify-center items-center">
          <Spinner className="w-12 h-12" />
        </div>
      </Layout>
    );
  }

  if (!pending && !user) {
    return <Navigate to="/" />;
  }

  // Not pending and has user:
  return children;
};

export default AuthWrapper;
