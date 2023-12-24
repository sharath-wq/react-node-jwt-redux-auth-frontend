import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import axios from "axios";
import Gradient from "../components/gradients/Gradient";
import { useSelector, useDispatch } from "react-redux";
import { clearAccessToken, clearUser, setAccessToken, setUser } from "../features/user/userSlice";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    // const [localUser, setLocalUser] = useState(useSelector((state) => state.userReducer.user));
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.userReducer.accessToken);
    const isAdmin = useSelector((state) => state.userReducer.user.isAdmin);
    const username = useSelector((state) => state.userReducer.user.username);

    useEffect(() => {
        const verifyAccessToken = async (token) => {
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };

            try {
                const { data } = await axios.get("http://localhost:4000", {
                    headers: headers,
                });

                setUser(data.user);

                return data.status;
            } catch (error) {
                console.error(error);
            }
        };

        const generateAccessToken = async (token) => {
            try {
                const { data } = await axios.post("http://localhost:4000/refresh", {}, { withCredentials: true });

                if (data.success) {
                    return data.accessToken;
                } else {
                    removeCookie("accessToken");
                    // navigate("/login");
                }
            } catch (error) {
                console.log(error);
            }
        };

        const validateUser = async () => {
            if (accessToken) {
                const isValid = await verifyAccessToken(accessToken);

                if (!isValid) {
                    if (!cookies.refreshToken) {
                        // navigate("/login");
                    }

                    const newAccessToken = await generateAccessToken(cookies.refreshToken);
                    const isValidNew = verifyAccessToken(newAccessToken);
                    if (!isValidNew) {
                        // navigate("/login");
                    }

                    dispatch(setAccessToken({ accessToken: newAccessToken }));
                }
            } else {
                // navigate("/login");
            }
        };

        validateUser();
    }, []);

    const Logout = () => {
        removeCookie("refreshToken");
        dispatch(clearUser());
        dispatch(clearAccessToken());
        navigate("/login", { replace: true });
    };

    return (
        <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
            <Gradient color={"bg-[#e6a5ff]"} positon={"-top-72 -right-72"} />
            <Gradient color={"bg-[#91d3ff]"} positon={"-bottom-72 -left-72"} />

            <div className="w-96 py-20 gap-10 shadow-2xl rounded-3xl bg-white flex items-center flex-col justify-around">
                <h2 className="px-10 text-4xl font-bold">Welcome back!</h2>
                <span className="px-10 text-2xl font-bold">{isAdmin ? "ADMIN" : username}</span>

                {isAdmin ? (
                    <Link className="px-10 border rounded-full py-2 font-bold" to={"/admin"}>
                        Go to Dashboard
                    </Link>
                ) : (
                    <Link className="px-10 border rounded-full py-2 font-bold" to={`profile/`}>
                        Go to Profile
                    </Link>
                )}
                <button
                    onClick={Logout}
                    className="px-10 rounded-full bg-gradient-to-r from-[#CF77F3] to-[#009BFF] text-white font-extrabold drop-shadow-xl py-2"
                    type="submit"
                >
                    Logout
                </button>
            </div>

            <Toaster />
        </div>
    );
};

export default Home;
