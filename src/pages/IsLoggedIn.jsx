import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const IsLoggedIn = ({ children }) => {
    const user = useSelector((state) => state.userReducer.user);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default IsLoggedIn;
