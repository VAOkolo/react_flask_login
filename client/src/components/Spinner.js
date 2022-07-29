const Spinner = ({ className }) => {
  return (
    <div
      className={`spinner-border animate-spin inline-block w-8 h-8 rounded-full ${className}`}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
