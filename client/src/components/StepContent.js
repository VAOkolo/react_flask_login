import { Fragment, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import TextInput from "./TextInput";
import Button from "./Button";
import Spinner from "./Spinner";

const StepContent = ({ step, previousStep, cachedInput, setCachedInput }) => {
  const { pending, error, user, updateUser } = useUserContext();
  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCachedInput("");
    updateUser({ [step.key]: input });
  };

  const handleBackPress = (e) => {
    e.preventDefault();

    if (previousStep) {
      // Cache submitted data from previous step before setting to null
      // in user object to prompt parent component to switch steps.
      setCachedInput(user[previousStep.key]);
      updateUser({ [previousStep.key]: null });
    } else {
      navigate("/logout");
    }
  };

  useEffect(() => {
    // Check if current form can accept the input type.
    const typesMatch = (formType, input) => {
      if (formType === "text" && typeof input === "string") {
        return true;
      } else {
        return formType === typeof input;
      }
    };

    if (inputRef.current && typesMatch(step.formType, cachedInput)) {
      // Set previously saved value to input form if the
      // step is loaded as a result of pressing back.
      // The data is considered not saved until pressing next.
      inputRef.current.value = cachedInput;
      setInput(cachedInput);
    }
  }, [step, cachedInput]);

  return (
    <Fragment>
      <h1>{step.title}</h1>
      <h2>{step.prompt}</h2>

      <form onSubmit={handleSubmit}>
        <TextInput
          ref={inputRef}
          type={step.formType}
          label={step.formLabel}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />

        {error ? <p className="text-red-700">An error has occurred.</p> : null}

        <div className="flex justify-center py-4">
          <Button type="button" className="mx-1" onClick={handleBackPress}>
            {pending ? <Spinner className="w-4 h-4" /> : null} ← Back
          </Button>

          <Button type="submit" className="mx-1" disabled={!input || pending}>
            {pending ? <Spinner className="w-4 h-4" /> : null} Next →
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default StepContent;
