import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  RouterProvider
} from "react-router-dom";
import "./index.css";
import router from "./routes/Routes";
import { AuthProvider } from "./contexts/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
