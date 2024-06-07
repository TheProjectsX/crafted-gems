import { useContext } from "react";
import UserDataContext from "../context/context";
import { NavLink } from "react-router-dom";

// React Toast
import { toast } from "react-toastify";

// React Icons
import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";

// Firebase Auth Provider
import { signOut } from "firebase/auth";
import auth from "../firebase/config";

const Navbar = () => {
  const context = useContext(UserDataContext);
  const { userAuthData, dataLoading, themeMode, setThemeMode } = context;

  // Logout User
  const handleLogout = () => {
    signOut(auth)
      .then(() => toast.success("Logout Successful"))
      .catch((error) => console.log(error));
  };

  const NavLinks = () => (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-crafts"}>All Art & Craft Items</NavLink>
      </li>
      <li>
        <NavLink to={"/add-craft"}>Add Craft Item</NavLink>
      </li>
      <li>
        <NavLink to={"/my-list"}>My Art & Craft List</NavLink>
      </li>

      <li>
        <button
          className="text-xl"
          onClick={() => {
            setThemeMode(themeMode === "dark" ? "light" : "dark");
          }}
          data-tooltip-id="elm-tooltip"
          data-tooltip-content={`Change Theme to ${
            themeMode === "dark" ? "Light" : "Dark"
          }`}
        >
          {themeMode === "dark" ? <MdSunny /> : <IoMoonSharp />}
        </button>
      </li>
      {userAuthData && (
        <li>
          <button className="btn btn-sm sm:hidden" onClick={handleLogout}>
            Logout
          </button>
        </li>
      )}
    </>
  );

  const UserProfile = () =>
    dataLoading ? (
      <span className="loading loading-dots loading-md"></span>
    ) : (
      <>
        {userAuthData ? (
          <>
            <button className="btn hidden sm:block" onClick={handleLogout}>
              Logout
            </button>
            <img
              src={userAuthData.photoURL}
              alt="Profile Picture"
              className="w-10 rounded-full border-2 border-gray-500 ml-3"
              data-tooltip-id="elm-tooltip"
              data-tooltip-content={userAuthData.displayName}
            />
          </>
        ) : (
          <div className="space-x-2">
            <NavLink
              className="btn"
              to={"/login"}
              data-tooltip-id="elm-tooltip"
              data-tooltip-content="Login to Your Account"
            >
              Login
            </NavLink>
            <NavLink
              className="btn hidden md:inline-flex"
              to={"/sign-up"}
              data-tooltip-id="elm-tooltip"
              data-tooltip-content="Create new Account"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </>
    );

  return (
    <div className="navbar bg-base-100 mb-4 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
          >
            <NavLinks />
          </ul>
        </div>
        <a className="btn btn-ghost font-lato text-xl sm:text-2xl hidden lg:inline-flex">
          Crafted Gems
        </a>
      </div>
      <a className="navbar-center btn btn-ghost font-lato text-xl sm:text-2xl lg:hidden">
        Crafted Gems
      </a>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end">
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;
