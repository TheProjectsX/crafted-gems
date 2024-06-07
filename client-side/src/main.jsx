import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import PrivateRoute from "./components/PrivateRoute.jsx";

// Routes
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import SignUp from "./routes/Signup.jsx";
import AllCrafts from "./routes/AllCrafts.jsx";
import AddCraft from "./routes/AddCraft.jsx";
import MyList from "./routes/MyList.jsx";
import UpdateCraft from "./routes/UpdateCraft.jsx";
import CraftDetails from "./routes/CraftDetails.jsx";
import CategoricalCrafts from "./routes/CategoricalCrafts.jsx";
import NotFound from "./routes/NotFound.jsx";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    loader: () => localStorage.getItem("themeMode"),
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => [
          await (
            await fetch("https://crafted-gems-server-side.vercel.app/items")
          ).json(),
          await (
            await fetch(
              "https://crafted-gems-server-side.vercel.app/categories"
            )
          ).json(),
          await (
            await fetch("https://crafted-gems-server-side.vercel.app/reviews")
          ).json(),
        ],
      },
      {
        path: "/login",
        element: (
          <PrivateRoute reverse>
            <Login />
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <PrivateRoute reverse>
            <SignUp />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-crafts",
        element: <AllCrafts />,
        loader: () =>
          fetch("https://crafted-gems-server-side.vercel.app/items"),
      },
      {
        path: "/categorical/:category",
        element: <CategoricalCrafts />,
        loader: ({ params }) =>
          fetch(
            `https://crafted-gems-server-side.vercel.app/items?category=${params.category}`
          ),
      },
      {
        path: "/add-craft",
        element: (
          <PrivateRoute>
            <AddCraft />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://crafted-gems-server-side.vercel.app/categories"),
      },
      {
        path: "/my-list",
        element: (
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-craft/:id",
        element: (
          <PrivateRoute>
            <UpdateCraft />
          </PrivateRoute>
        ),

        loader: async ({ params }) => [
          await (
            await fetch(
              `https://crafted-gems-server-side.vercel.app/items/${params.id}`
            )
          ).json(),
          await (
            await fetch(
              "https://crafted-gems-server-side.vercel.app/categories"
            )
          ).json(),
        ],
      },
      {
        path: "/craft-details/:id",
        element: (
          <PrivateRoute>
            <CraftDetails />
          </PrivateRoute>
        ),

        loader: ({ params }) =>
          fetch(
            `https://crafted-gems-server-side.vercel.app/items/${params.id}`
          ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
