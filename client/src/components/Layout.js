const Layout = ({ className, children }) => {
  return (
    <div className={`container mx-auto max-w-xl px-6 py-12 prose ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
