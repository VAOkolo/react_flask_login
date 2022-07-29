const Button = (props) => {
  return (
    <button
      {...props}
      className={`
        inline-block
        px-7 
        py-3 
        bg-blue-600 
        text-white 
        font-medium 
        text-sm 
        leading-tight
        uppercase 
        rounded 
        shadow-md
        opacity-50
        ${
          !props.disabled
            ? `hover:bg-blue-700 
              hover:shadow-lg 
              focus:bg-blue-700 
              focus:shadow-lg 
              focus:outline-none 
              focus:ring-0 
              active:bg-blue-800 
              active:shadow-lg 
              transition 
              duration-150 
              ease-in-out
              opacity-100`
            : ""
        }
        ${props.className}
      `}
    >
      {props.children}
    </button>
  );
};

export default Button;
