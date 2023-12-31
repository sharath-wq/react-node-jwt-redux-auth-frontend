import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Gradient from "../components/gradients/Gradient";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../features/user/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });

    const [inputErrors, setInputErrors] = useState({
        email: "",
        password: "",
        username: "",
    });

    const validateEmail = () => {
        const { email } = inputValue;
        if (!email) {
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                email: "Email is required",
            }));
            return false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                email: "Please enter a valid email address",
            }));
            return false;
        } else {
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                email: "",
            }));
            return true;
        }
    };

    const { email, password } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
        setInputErrors({
            ...inputErrors,
            [name]: "", // Clear error when typing
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail();

        if (isEmailValid) {
            try {
                const { data } = await axios.post(
                    "http://localhost:4000/login",
                    {
                        ...inputValue,
                    },
                    {
                        withCredentials: true,
                    }
                );

                const { success, message } = data;

                if (success) {
                    dispatch(
                        setUser({
                            user: data.user,
                        })
                    );

                    dispatch(
                        setAccessToken({
                            accessToken: data.accessToken,
                        })
                    );
                    toast.success(message);
                    setTimeout(() => {
                        navigate("/", { replace: true });
                    }, 1000);
                } else {
                    toast.error(message);
                }
            } catch (error) {
                console.log(error);
            }

            setInputValue({
                ...inputValue,
                email: "",
                password: "",
            });
        }
    };

    return (
        <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
            <Gradient color={"bg-[#ADD8E6]"} positon={"-top-72 -right-72"} />
            <Gradient color={"bg-[#f9ddeb]"} positon={"-bottom-72 -left-72"} />

            <div className="w-96 py-20 gap-10 shadow-2xl rounded-3xl bg-white flex items-center flex-col justify-around">
                <h2 className="text-4xl font-bold">Welcome back!</h2>
                <form className="gap-5 flex flex-col w-full px-10" onSubmit={handleSubmit}>
                    <input
                        className="py-3 bg-transparent border-b border-gray-600 outline-none"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                    <p className="mt-0.5 visible text-sm text-red-600">{inputErrors.email}</p>
                    <input
                        className="py-3 bg-transparent border-b border-gray-600 outline-none"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />

                    <button
                        className="w-full rounded-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-extrabold drop-shadow-xl py-2"
                        type="submit"
                    >
                        Login
                    </button>
                    <span className="text-base font-light">
                        Dont't have an account?{" "}
                        <Link className="font-bold" to={"/signup"}>
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default Login;
