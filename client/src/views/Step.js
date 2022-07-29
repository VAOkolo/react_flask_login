import { useParams, Link, Navigate } from "react-router-dom";
import Button from "../components/Button";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";

const steps = [
  {
    title: "Step 1",
    prompt: "What is your full name?",
    formType: "text",
    formLabel: "e.g., John Doe",
    next: "/step/2",
    back: "/login",
  },
  {
    title: "Step 2",
    prompt: "How old are you?",
    formType: "number",
    formLabel: "e.g., 21",
    next: "/step/3",
    back: "/step/1",
  },
  {
    title: "Step 3",
    prompt: "What is your favorite color?",
    formType: "text",
    formLabel: "e.g., blue... no, yellow!",
    next: "/home",
    back: "/step/2",
  },
];

const Step = () => {
  const params = useParams();
  const step = steps[params.number - 1];

  if (!step) {
    return <Navigate to="/step/1" />;
  }

  return (
    <Layout>
      <h1>{step.title}</h1>
      <h2>{step.prompt}</h2>

      <TextInput type={step.formType} label={step.formLabel} />

      <div className="flex justify-center py-4">
        <Link to={step.back}>
          <Button className="mx-1">← Back</Button>
        </Link>

        <Link to={step.next}>
          <Button className="mx-1">Next →</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Step;
