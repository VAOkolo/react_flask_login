import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../components/AuthWrapper";
import Layout from "../components/Layout";
import { useUserContext } from "../context/UserContext";

const userInfo = [
  {
    key: "fullName",
    label: "Your Full Name",
  },
  {
    key: "age",
    label: "Your Age",
  },
  {
    key: "favoriteColor",
    label: "Your Favorite Color",
  },
];

const Inside = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    switch (true) {
      case user && !user.fullName:
        navigate("/step/1");
        break;

      case user && !user.age:
        navigate("/step/2");
        break;

      case user && !user.favoriteColor:
        navigate("/step/3");
        break;

      default:
        return;
    }
  }, [user, navigate]);

  return (
    <AuthWrapper>
      <Layout>
        <h1>Welcome inside!</h1>

        {user
          ? userInfo.map((info) => {
              return (
                <div key={info.key}>
                  <h2>{info.label}</h2>
                  <p className="text-6xl font-light">{user[info.key]}</p>
                </div>
              );
            })
          : null}
      </Layout>
    </AuthWrapper>
  );
};

export default Inside;
