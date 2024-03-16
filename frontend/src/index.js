import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import LoginContainer from './components/LoginContainer/LoginContainer';
import AppContainer from './components/AppContainer/AppContainer';
import Check from './components/Check/Check';
import Profile from './components/Profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginContainer />,
  },
  {
    path: "/app",
    element: <AppContainer />,
    children: [
      {
        path: "check",
        element: <Check />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "browse",
        element: () => <div>Browse</div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
