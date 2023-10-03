import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LandPage from "./pages/LandPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { currentUser } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Posts from "./pages/Posts";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(currentUser());
    }
  }, [dispatch]);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </div>
  );
}

export default App;
