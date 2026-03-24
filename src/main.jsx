// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { createBrowserRouter } from 'react-router-dom'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter,Navigate,RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage"
import FundraiserPage from "./pages/FundraiserPage"

import NavBar from "./compenents/NavBar"
import App from "../../todo-list/src/App";
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage"
import CreateFundraiserForm from "./compenents/CreateFundraiserForm";
import CreateFundraiserPage from "./pages/CreateFundraiserPage";

const isLoggedIn = Boolean(window.localStorage.getItem("token"));
// console.log(isLoggedIn);


const router = createBrowserRouter([
  {
    path:"/",
    element: <NavBar isLoggedIn={isLoggedIn}/>,
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
        path: "/create-fundraiser", element:  isLoggedIn? <CreateFundraiserPage/> : <LoginPage/>
        // element: isLoggedIn? <CreateFundraiserPage/> : <Navigate to="/login" replace/> //Navigate to="/login"
      },
      {
        path: "/fundraiser/:id",element:<FundraiserPage/>
      },
    ]
  }
]);


ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


