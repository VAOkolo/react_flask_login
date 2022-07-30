import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import AuthWrapper from "../components/AuthWrapper";
import Button from "../components/Button";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import Spinner from "../components/Spinner";

const steps = [
  {
    title: "Step 1",
    prompt: "What is your full name?",
    key: "fullName",
    formType: "text",
    formLabel: "e.g., John Doe",
    next: "/step/2",
    back: "/logout",
  },
  {
    title: "Step 2",
    prompt: "How old are you?",
    key: "age",
    formType: "number",
    formLabel: "e.g., 21",
    next: "/step/3",
    back: "/step/1",
  },
  {
    title: "Step 3",
    prompt: "What is your favorite color?",
    key: "favoriteColor",
    formType: "text",
    formLabel: "e.g., blue... no, yellow!",
    next: "/home",
    back: "/step/2",
  },
];

const Step = () => {
  const params = useParams();
  const step = steps[params.number - 1] || null;

  const { pending, error, user, updateUser } = useUserContext();
  const [input, setInput] = useState(user ? user[step.key] : "");

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser({ [step.key]: input }, () => {
      // Callback when update is successful.
      navigate(step.next);
    });
  };

  useEffect(() => {
    // Set any previously saved value to input form.
    if (user.username && inputRef.current) {
      inputRef.current.value = user[step.key];
      setInput(user[step.key]);
    }
  }, [user, step.key]);

  return (
    <AuthWrapper>
      <Layout>
        <h1>{step.title}</h1>
        <h2>{step.prompt}</h2>

        <form onSubmit={handleSubmit}>
          <TextInput
            ref={inputRef}
            type={step.formType}
            label={step.formLabel}
            onChange={(e) => setInput(e.target.value)}
          />

          {error ? (
            <p className="text-red-700">An error has occurred.</p>
          ) : null}

          <div className="flex justify-center py-4">
            <Link to={step.back}>
              <Button className="mx-1">← Back</Button>
            </Link>

            <Button type="submit" className="mx-1" disabled={!input || pending}>
              {pending ? <Spinner className="w-4 h-4" /> : null} Next →
            </Button>
          </div>
        </form>
      </Layout>
    </AuthWrapper>
  );
};

export default Step;
