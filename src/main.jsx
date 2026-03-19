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
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage"
import FundraiserPage from "./pages/FundraiserPage"

import NavBar from "./compenents/NavBar"
import App from "../../todo-list/src/App";

const router = createBrowserRouter([
  {
    path:"/",
    element: <NavBar/>,
    children:[
      {
        path: "/", element: <HomePage/>
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


