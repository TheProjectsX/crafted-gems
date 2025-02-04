import { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

// React Toast
import { toast } from "react-toastify";

// Firebase Auth Provider
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import auth from "../firebase/config";

// React Helmet
import { Helmet } from "react-helmet";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Login using Google
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userData) => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/users/${userData.user.uid}`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) {
              fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  name: userData.user.displayName,
                  email: userData.user.email,
                  uid: userData.user.uid,
                }),
              });
            }
          });
        toast.success("Login Successful!");
      })
      .catch((error) => console.log(error));
  };

  // Login using GitHub
  const handleGitHubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((userData) => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/users/${userData.user.uid}`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) {
              fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  name: userData.user.displayName,
                  email: userData.user.email,
                  uid: userData.user.uid,
                }),
              });
            }
          });
        toast.success("Login Successful!");
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login Successful!");
      })
      .catch((error) => {
        e.target.submit.classList.add("animate__shakeX");
        setTimeout(() => {
          e.target.submit.classList.remove("animate__shakeX");
        }, 3000);

        if (error.code === "auth/invalid-credential") {
          toast.error("Incorrect Credentials!");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many Invalid Login attempts!");
        } else {
          console.log(error);
          toast.error("Error Ocurred in the Server");
        }
      });
  };

  return (
    <section className="">
      <Helmet>
        <title>Login to Your Account | Crafted Gems</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center sm:px-6 py-8 mx-auto">
        <h3 className="flex items-center mb-6 text-2xl font-semibold dark:text-white font-lato">
          Welcome Back!
        </h3>
        <div className="rounded-lg shadow-lg border md:mt-0 w-full sm:w-fit xl:p-0 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white text-center underline underline-offset-8">
              Login to Your Account
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="px-6 py-2.5 flex justify-center items-center gap-2 border border-[#4b5563] rounded-lg hover:bg-gray-200 dark:hover:bg-[#374151] dark:hover:text-gray-200"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>
              <button
                className="px-6 py-2.5 flex justify-center items-center gap-2 border border-[#4b5563] rounded-lg hover:bg-gray-200 dark:hover:bg-[#374151] dark:hover:text-gray-200"
                onClick={handleGitHubLogin}
              >
                <FaGithub className="text-xl dark:text-white" />
                Continue with GitHub
              </button>
            </div>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 dark:text-gray-400">Or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium dark:text-white">
                  Your Email <span className="text-red-600">*</span>
                  <input
                    type="email"
                    name="email"
                    className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                    placeholder="name@company.com"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white relative">
                  Password <span className="text-red-600">*</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={showPassword ? "123456" : "••••••"}
                    minLength={6}
                    className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                    required
                  />
                  <div
                    className="absolute right-1 top-8 text-xl p-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="ml-3 text-sm">
                  <label className="dark:text-gray-300 items-center flex gap-2">
                    <input
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-[#2563eb] ring-offset-gray-800"
                      required=""
                    />
                    Remember me
                  </label>
                </div>
                <a className="text-sm font-medium hover:underline text-[#3b82f6] cursor-pointer">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                name="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center animate__animated"
              >
                Login
              </button>
              <p className="text-sm font-light dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/sign-up"
                  className="font-medium hover:underline text-[#3b82f6] pl-4"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
