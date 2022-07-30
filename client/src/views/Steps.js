import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import AuthWrapper from "../components/AuthWrapper";
import Layout from "../components/Layout";
import StepContent from "../components/StepContent";

export const steps = [
  {
    title: "Step 1",
    prompt: "What is your full name?",
    description: "Your full name",
    key: "fullName",
    formType: "text",
    formLabel: "e.g., John Doe",
  },
  {
    title: "Step 2",
    prompt: "How old are you?",
    description: "Your age",
    key: "age",
    formType: "number",
    formLabel: "e.g., 21",
  },
  {
    title: "Step 3",
    prompt: "What is your favorite color?",
    description: "Your favorite color",
    key: "favoriteColor",
    formType: "text",
    formLabel: "e.g., blue... no, yellow!",
  },
];

// View that controls which step to display on screen.
const Steps = () => {
  const { user } = useUserContext();
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if all steps have already been completed.
    if (steps.every((step) => user[step.key])) {
      navigate("/home");
    }

    // If not yet completed, find the first item in the
    // sequence of steps that has not yet been submitted.
    for (let i = 0; i < steps.length; i++) {
      if (!user[steps[i].key]) {
        setStepIndex(i);
        break;
      }
    }
  }, [user, navigate]);

  return (
    <AuthWrapper>
      <Layout>
        <StepContent
          step={steps[stepIndex]}
          previousStep={steps[stepIndex - 1]}
        />
      </Layout>
    </AuthWrapper>
  );
};

export default Steps;
