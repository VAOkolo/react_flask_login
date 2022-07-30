const Layout = ({ className, children }) => {
  return (
    <div
      className={`
        container 
        mx-auto 
        max-w-xl 
        px-6 
        h-[100vh] 
        flex 
        flex-col 
        justify-center
        prose 
      ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Layout;
