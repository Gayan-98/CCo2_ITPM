import Navbar from "./components/navbar/Navbar";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./style.scss";
import Home from "./pages/home/Home";
import HomePage from "./pages/home/Home1";
import Login from "./pages/login/Login";
import LeftBar from "./components/leftBar/LeftBar";
import LeftBar2 from "./components/leftBar/LeftBar2";
import RightBar from "./components/rightBar/RightBar";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import AdvanceQuiz from "./pages/advanceQuiz/advanceQuiz";
import Attempt from "./pages/advanceQuiz/attemptQuiz";

import DisplayQuiz from "./pages/advanceQuiz/displayQuiz";

import SubmitQuiz from "./pages/advanceQuiz/SubmitQuiz";
import Chat from "./components/chat/Chat";
import Register from "./pages/register/Register";
import CodeMetricsTable from "./pages/CodeMetricsTable/CodeMetricsTable ";
import DisplayFeedback from "./pages/CodeMetricsTable/displayFeedback";
import Cleancode from "./pages/CodeMetricsTable/cleancode";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 10 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const Layout2 = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 10 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const Layout3 = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 10 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const Layout4 = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar2 />
          <div style={{ flex: 10 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },

    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/advanceQuiz",
          element: <AdvanceQuiz />,
        },
      ],
    },

    {
      path: "/chat",
      element: <Chat />,
      children: [
        {
          path: "/chat",
          element: <Chat />,
        },
      ],
    },

    {
      path: "/",
      element: <Layout2 />,
      children: [
        {
          path: "/Attempt",
          element: <Attempt />,
        },
      ],
    },

    {
      path: "/",
      element: <Layout3 />,
      children: [
        {
          path: "/SubmitQuiz",
          element: <SubmitQuiz />,
        },
      ],
    },

    {
      path: "/",
      element: <Layout2 />,
      children: [
        {
          path: "/summery",
          element: <CodeMetricsTable />,
        },
      ],
    },
    {
      path: "/",
      element: <Layout4 />,
      children: [
        {
          path: "/feedback",
          element: <DisplayFeedback />,
        },
      ],
    },

    {
      path: "/",
      element: <Layout4 />,
      children: [
        {
          path: "/clean",
          element: <Cleancode />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
