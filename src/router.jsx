import { createBrowserRouter } from "react-router-dom";
import { Login, SignUp } from "./pages";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/Protected";
import IsLoggedIn from "./pages/IsLoggedIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/login",
        element: (
            <IsLoggedIn>
                <Login />
            </IsLoggedIn>
        ),
    },
    {
        path: "/signup",
        element: (
            <IsLoggedIn>
                <SignUp />
            </IsLoggedIn>
        ),
    },
]);

export default router;
