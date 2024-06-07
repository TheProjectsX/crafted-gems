import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, useLoaderData } from "react-router-dom";
import UserDataContext from "./context/context";
import { useEffect, useReducer, useRef, useState } from "react";

// React Tooltip
import { Tooltip } from "react-tooltip";

// React Toast
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Animate CSS
import "animate.css";

// Firebase Auth
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/config";

// Swiper
import { register } from "swiper/element/bundle";
register();

function App() {
  const savedTheme = useLoaderData();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [dataLoading, setDataLoading] = useState(true);
  const [userAuthData, setUserAuthData] = useState(null);
  const [themeMode, setThemeMode] = useState(savedTheme ?? "light");

  const themeElmRef = useRef(null);

  // Auth Change Effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user === null || user?.photoURL !== null) {
        setDataLoading(false);
        setUserAuthData(user);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    console.log(themeMode);

    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "sunset";
      themeElmRef.current.dataset.theme = "night";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "";
      themeElmRef.current.dataset.theme = "";
    }
  }, [themeMode]);

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Tooltip id="elm-tooltip" className="z-50" border="1px solid red" />
      <div
        className="max-w-[1100px] mx-auto font-ubuntu shadow-2xl"
        data-theme="night"
        ref={themeElmRef}
      >
        <UserDataContext.Provider
          value={{
            userAuthData,
            setUserAuthData,
            dataLoading,
            forceUpdate,
            themeMode,
            setThemeMode,
          }}
        >
          <Navbar />
          <div className="px-4 mb-10">
            <Outlet />
          </div>
          <Footer />
        </UserDataContext.Provider>
      </div>
    </>
  );
}

export default App;
