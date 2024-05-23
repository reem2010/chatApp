import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import io from 'socket.io-client';

const userId = localStorage.getItem('userId');
let socket;

if (userId) {
  
  socket = io(import.meta.env.VITE_Host, {
    withCredentials: true,
    query: { userId: userId },
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Message socket={socket} /> 
    </RouterProvider>
  </React.StrictMode>
);
