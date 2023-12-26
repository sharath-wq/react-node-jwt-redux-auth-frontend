import { createBrowserRouter } from "react-router-dom";
import { Login, SignUp, ProtectedRoute, IsLoggedIn, AdminRoute, Dashboard, Profile, User, Edit, AddUser } from "./pages";
import Home from "./pages/Home";

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
    {
        path: "/admin",
        element: (
            <AdminRoute>
                <Dashboard />
            </AdminRoute>
        ),
    },
    {
        path: "/admin/user/:id",
        element: (
            <AdminRoute>
                <User />
            </AdminRoute>
        ),
    },
    {
        path: "/admin/user/:id/edit",
        element: (
            <AdminRoute>
                <Edit />
            </AdminRoute>
        ),
    },
    {
        path: "/admin/add",
        element: (
            <AdminRoute>
                <AddUser />
            </AdminRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />,
            </ProtectedRoute>
        ),
    },
]);

export default router;
