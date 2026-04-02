
import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter,Navigate,RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage"
import FundraiserPage from "./pages/FundraiserPage"

import NavBar from "./components/NavBar"
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage"
import CreateFundraiserForm from "./components/CreateFundraiserForm";
import CreateFundraiserPage from "./pages/CreateFundraiserPage";  
import LogoutPage from "./pages/LogoutPage";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./components/AuthProvider.jsx";
// import PledgePage from "./pages/PledgePage";

// const isLoggedIn = Boolean(window.localStorage.getItem("token"));
// console.log(isLoggedIn);


const router = createBrowserRouter([
  {
    path:"/",
    element: <NavBar/>,
    children:[
      {
        path: "/", element: <HomePage/>
      },
      {
        path: "/login", element: <LoginPage/>
      },
      {
        path: "/register", element: <CreateUserPage/>
      },
      {
        path: "/create-fundraiser", element: <CreateFundraiserPage/>
      },
      {
        path: "/fundraiser/:id",element:<FundraiserPage/>
      },
      {
        path: "/logout", element: <LogoutPage/>
      },
    ]
  }
]);


ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);


