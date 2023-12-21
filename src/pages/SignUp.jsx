import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { email, password, username } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/signup",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            username: "",
        });
    };

    return (
        <div className="w-full h-screen overflow-hidden flex items-center justify-center">
            {/* Gradients */}

            <div className="absolute -z-10 h-[50rem] w-[50rem] -top-72 blur-[10rem] -left-72 rounded-full bg-[#ffc3c3] "></div>

            <div className="absolute -z-10 h-[50rem] w-[50rem] blur-[10rem] -bottom-72 -right-72 rounded-full bg-[#FFE4C4] "></div>

            {/* Gradients */}

            <div className="w-96 py-20 gap-10 shadow-2xl rounded-3xl bg-white flex items-center flex-col justify-around">
                <h2 className="text-4xl font-bold">Create Account</h2>
                <form className="gap-5 flex flex-col w-full px-10" onSubmit={handleSubmit}>
                    <input
                        className="py-3 bg-transparent border-b border-gray-600 outline-none"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                    <input
                        className="py-3 bg-transparent border-b border-gray-600 outline-none"
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                    />
                    <input
                        className="py-3 bg-transparent border-b border-gray-600 outline-none"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                    <button
                        className="w-full rounded-full bg-gradient-to-r from-red-400 to-yellow-400 text-white font-extrabold drop-shadow-xl py-2"
                        type="submit"
                    >
                        Signup
                    </button>
                    <span>
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </span>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
