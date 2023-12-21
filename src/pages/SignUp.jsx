import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const SignUp = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
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

    const validateUsername = () => {
        const { username } = inputValue;
        if (!username) {
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                username: "Username is required",
            }));
            return false;
        } else if (username.length < 4) {
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                username: "Username must be at least 4 characters long",
            }));
            return false;
        } else {
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                username: "",
            }));
            return true;
        }
    };

    const validatePassword = () => {
        const { password } = inputValue;
        if (!password) {
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password is required",
            }));
            return false;
        } else if (password.length < 6) {
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password must be at least 6 characters long",
            }));
            return false;
        } else {
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                password: "",
            }));
            return true;
        }
    };

    const { email, password, username } = inputValue;
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
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isUsernameValid && isPasswordValid) {
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
                    toast.success(message);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                } else {
                    toast.error(message);
                }
            } catch (error) {
                console.log(error);
            }
            setInputValue({
                email: "",
                password: "",
                username: "",
            });
        }
    };

    return (
        <div className="w-full relative h-screen overflow-hidden flex items-center justify-center">
            {/* Gradients */}

            <div className="absolute -z-10 h-[50rem] w-[50rem] -top-72 blur-[10rem] -left-72 rounded-full bg-[#ffc3c3] "></div>

            <div className="absolute -z-10 h-[50rem] w-[50rem] blur-[10rem] -bottom-72 -right-72 rounded-full bg-[#FFE4C4] "></div>
            {/* ... Rest of your code remains unchanged ... */}
            <div className="w-96 py-20 gap-10 shadow-2xl rounded-3xl bg-white flex items-center flex-col justify-around">
                <h2 className="text-4xl font-bold">Create Account</h2>
                <form className="gap-5 flex flex-col w-full px-10" onSubmit={handleSubmit}>
                    <input
                        className="pb-3 bg-transparent border-b border-gray-600 outline-none"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                    <p className="mt-0.5 visible text-sm text-red-600 ">{inputErrors.email}</p>
                    <input
                        className="pb-3 bg-transparent border-b border-gray-600 outline-none"
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                    />
                    <p className="mt-0.5 visible text-sm text-red-600 dark:text-red-500">{inputErrors.username}</p>
                    <input
                        className="pb-3 bg-transparent border-b border-gray-600 outline-none"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                    <p className="mt-0.5 visible text-sm text-red-600 dark:text-red-500">{inputErrors.password}</p>
                    <button
                        className="w-full rounded-full bg-gradient-to-r from-red-400 to-yellow-400 text-white font-extrabold drop-shadow-xl py-2"
                        type="submit"
                    >
                        Signup
                    </button>
                    <span>
                        Already have an account?{" "}
                        <Link className="font-bold" to={"/login"}>
                            Login
                        </Link>
                    </span>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default SignUp;
