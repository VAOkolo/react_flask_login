import { useUserContext } from "../context/UserContext";

const Navbar = () => {
  const { user } = useUserContext();

  return (
    <div>
      <nav
        className="relative
        w-full 
        flex 
        flex-wrap 
        items-center 
        justify-between 
        py-4 
        bg-gray-100 
        text-gray-500 
        hover:text-gray-700 
        focus:text-gray-700 
        shadow-lg"
      >
        <div className="container-fluid flex flex-wrap items-center px-6">
          <a className="text-xl text-black font-semibold" href="/">
            Demo
          </a>
        </div>

        <div className="navbar-nav px-6">
          {!user.username ? (
            <a className="nav-link active" href="/register">
              Sign Up
            </a>
          ) : (
            <div>
              User: <span className="font-bold mr-6">{user.username}</span>
              <a className="nav-link active" href="/logout">
                Log Out
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
