import React, { useEffect, useState } from "react";
import Gradient from "../components/gradients/Gradient";
import { Link, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";

const User = () => {
    const userId = useParams().id;
    const [user, setUser] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:4000/user/${userId}`)
            .then((response) => response.data.user)
            .then((user) => setUser(user))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
                <Gradient color={"bg-[#F0E68C]"} position={"top-0 left-0"} />
                <Gradient color={"bg-[#FFDAB9]"} position={"bottom-0 right-0"} />

                <div className="w-96 py-20 px-10 gap-2 px shadow-2xl rounded-3xl bg-white flex items-center flex-col  relative">
                    <Link className="absolute top-6 left-5" to="/admin">
                        <IoArrowBack className=" text-gray-500 text-2xl" />
                    </Link>

                    <h2 className="px-10 text-3xl font-bold">USER DETAILS</h2>

                    <img className="w-52 rounded-full shadow-2xl object-cover mt-2" src={user?.imageUrl} alt="" />

                    <h1 className="py-1 bg-transparent border-none text-center text-2xl font-bold outline-none">
                        {user?.username}
                    </h1>

                    <span className="py-1 bg-transparent border-none text-center text-base font-bold outline-none">
                        {user?.email}
                    </span>

                    <span className="py-1 bg-transparent border-none text-center text-gray-500 text-base font-medium outline-none">
                        {new Date(user?.createdAt).toLocaleString()}
                    </span>
                </div>
            </div>
        </>
    );
};

export default User;
