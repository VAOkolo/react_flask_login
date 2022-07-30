import { forwardRef } from "react";

const TextInput = forwardRef((props, ref) => {
  return (
    <div className="form-floating mb-3 w-full">
      <input
        {...props}
        ref={ref}
        className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 
          focus:bg-white 
          focus:border-blue-600 
          focus:outline-none"
        placeholder={props.label}
      />

      <label htmlFor={props.id} className="text-gray-700">
        {props.label}
      </label>
    </div>
  );
});

export default TextInput;
