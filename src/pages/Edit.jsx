import React, { useEffect, useState } from "react";
import Gradient from "../components/gradients/Gradient";
import { Link, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import Input from "../components/login/Inputs";
import toast, { Toaster } from "react-hot-toast";

const Edit = () => {
    const userId = useParams().id;
    const [user, setUser] = useState();

    const [inputValue, setInputValue] = useState({
        email: "",
        username: "",
    });

    const [inputErrors, setInputErrors] = useState({
        email: "",
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

    const { email, password, username } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
        setInputErrors({
            ...inputErrors,
            [name]: "",
        });
    };

    const fetchUser = () => {
        axios
            .get(`http://localhost:4000/user/${userId}`)
            .then((response) => response.data.user)
            .then((data) => {
                setUser(data);
                setInputValue({ email: data.email, username: data.username });
            });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEmailValid = validateEmail();
        const isUsernameValid = validateUsername();

        if (isEmailValid && isUsernameValid) {
            try {
                const { data } = await axios.post(`http://localhost:4000/user/${userId}/edit`, {
                    ...inputValue,
                });

                toast.success(data.message);

                setInputValue({
                    email: data.updatedUser.email,
                    username: data.updatedUser.username,
                });

                fetchUser();
            } catch (error) {
                console.log(error);
            }
            setInputValue({
                email: "",
                username: "",
            });
        }
    };

    return (
        <>
            <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
                <Gradient color={"bg-[#B0E0E6]"} position={"top-0 left-0"} />
                <Gradient color={"bg-[#FFDAB9]"} position={"bottom-0 right-0"} />

                <div className="w-96 py-20 px-10 gap-2 px shadow-2xl rounded-3xl bg-white flex items-center flex-col justify-around relative">
                    <Link to="/admin">
                        <IoArrowBack className="absolute top-6 left-5 text-gray-500 text-2xl" />
                    </Link>

                    <h2 className="px-10 text-3xl font-bold">USER DETAILS</h2>

                    <img className="w-52 rounded-full shadow-2xl object-cover mt-2 mb-4" src={user?.imageUrl} alt="" />

                    <form className="gap-5 flex flex-col w-full px-10" onSubmit={handleSubmit}>
                        <Input
                            type={"email"}
                            name={"email"}
                            value={inputValue.email}
                            placeholder={"Enter Your Email"}
                            onChange={handleOnChange}
                        />
                        <p className="mt-0.5 visible text-sm text-red-600 ">{inputErrors.email}</p>
                        <Input
                            type={"text"}
                            name={"username"}
                            value={inputValue.username}
                            placeholder={"Enter Your Username"}
                            onChange={handleOnChange}
                        />
                        <p className="mt-0.5 visible text-sm text-red-600 dark:text-red-500">{inputErrors.username}</p>

                        <button
                            className="w-full rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-extrabold drop-shadow-xl py-2"
                            type="submit"
                        >
                            Save Change
                        </button>
                    </form>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Edit;
