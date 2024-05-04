import Navbar from "./components/navbar/Navbar";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./style.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import LeftBar from "./components/leftBar/LeftBar";
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

import QuizInsert from "./pages/BeginnerQuiz/QuizInsert";
import QuizView from "./pages/BeginnerQuiz/QuizView";
import categoryView from "./pages/BeginnerQuiz/categoryView";
import quizEdit from "./pages/BeginnerQuiz/quizEdit";


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
      path: "/", 
      element: <Layout2 />,
      children: [
        {
          path: "/QuizInsert", 
          element: <QuizInsert/>,
        },
      ],
    },

    {
      path: "/", 
      element: <Layout2 />,
      children: [
        {
          path: "/QuizView", 
          element: <QuizView/>,
        },
      ],
    },

    {
      path: "/", 
      element: <Layout2 />,
      children: [
        {
          path: "/categoryView", 
          element: <categoryView/>,
        },
      ],
    },

    {
      path: "/", 
      element: <Layout2 />,
      children: [
        {
          path: "/quizEdit", 
          element: <quizEdit/>,
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
      element: <Layout3/>,
      children: [
        {
          path: "/SubmitQuiz", 
          element: <SubmitQuiz/>,
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