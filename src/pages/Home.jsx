import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import axios from "axios";
import Gradient from "../components/gradients/Gradient";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setAccessToken, setUser } from "../features/user/userSlice";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.userReducer.accessToken);

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

                return data.status;
            } catch (error) {
                console.error(error);
            }
        };

        const generateAccessToken = async (token) => {
            try {
                const { data } = await axios.post("http://localhost:4000/refresh", {}, { withCredentials: true });
                console.log(data);

                if (data.status) {
                    return data.accessToken;
                } else {
                    removeCookie("accessToken");
                    navigate("/login");
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
                        navigate("/login");
                    }

                    const newAccessToken = await generateAccessToken(cookies.refreshToken);
                    const isValidNew = verifyAccessToken(newAccessToken);
                    if (!isValidNew) {
                        navigate("/login");
                    }

                    dispatch(setAccessToken({ accessToken: newAccessToken }));
                }
            } else {
                navigate("/login");
            }
        };

        validateUser();
    }, [accessToken, cookies, navigate, removeCookie, dispatch]);

    const Logout = () => {
        removeCookie("refreshToken");
        dispatch(clearUser());
        navigate("/login", { replace: true });
    };

    return (
        <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
            <Gradient color={"bg-[#e6a5ff]"} positon={"-top-72 -right-72"} />
            <Gradient color={"bg-[#91d3ff]"} positon={"-bottom-72 -left-72"} />

            <div className="w-96 py-20 gap-10 shadow-2xl rounded-3xl bg-white flex items-center flex-col justify-around">
                <h2 className="text-4xl font-bold">Welcome back! {username}</h2>

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
