import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

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
]