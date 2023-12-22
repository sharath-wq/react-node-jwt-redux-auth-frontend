import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import axios from "axios";
import Gradient from "../components/gradients/Gradient";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            const { data } = await axios.post("http://localhost:4000", {}, { withCredentials: true });
            const { status, user } = data;
            setUsername(user);
            return status
                ? toast(`Hello ${user}`, {
                      position: "top-right",
                  })
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
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
