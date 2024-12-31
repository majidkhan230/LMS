import ForgotPassword from "@/pages/FogotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ResetPasswordPage from "@/pages/ResetPage";

export const routes = [
    {
        path: '/',
        element:<Login/>
    },
    {
        path: '/signup',
        element:<SignUp/>
    },
    {
        path: '/home',
        element:<Home/>
    },
    {
        path: '/reset',
        element:<ForgotPassword/>
    },
    {
        path: '/reset/:token',
        element:<ResetPasswordPage/>
    },
]