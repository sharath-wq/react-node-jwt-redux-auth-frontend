import React, { useEffect, useRef, useState } from "react";
import Gradient from "../components/gradients/Gradient";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const Profile = () => {
    const [image, setImage] = useState();
    const [previewImageUrl, setpreviewImageUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const fileInput = useRef(null);

    const dispatch = useDispatch();

    const token = useSelector((state) => state.userReducer.accessToken);

    const _id = useSelector((state) => state.userReducer.user._id);

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:4000/profile/${_id}`);

            if (response.statusText === "OK") {
                const { username, email, imageUrl } = response.data.user;

                setImageUrl(imageUrl);
                setEmail(email);
                setUsername(username);
            }
        };

        fetchUser();
    }, [imageUrl, email]);

    useEffect(() => {
        if (!image) return;
        const newPreviewImageUrl = URL.createObjectURL(image);
        setpreviewImageUrl(newPreviewImageUrl);
        console.log(newPreviewImageUrl);
    }, [image]);

    const handleButtonClick = () => {
        fileInput.current.click();
    };

    const handleSaveImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("id", _id);

        try {
            const response = await axios.post("http://localhost:4000/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(response.data.user.imageUrl);
            toast.success("Image uploaded successfully");
            setpreviewImageUrl(null);
        } catch (error) {
            console.log(error);
            toast.error("Error uplaoding image");
            setpreviewImageUrl(null);
        }
    };

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleBlur = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/update/${_id}`,
                {
                    username,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setUser({ user: response.data.user }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
                <Gradient color={"bg-[#B0E0E6]"} position={"top-0 left-0"} />
                <Gradient color={"bg-[#FFDAB9]"} position={"bottom-0 right-0"} />

                <div className="w-96 py-20 px-10 gap-2 px shadow-2xl rounded-3xl bg-white flex items-center flex-col justify-around relative">
                    <Link to="/">
                        <IoArrowBack className="absolute top-6 left-5 text-gray-500 text-2xl" />
                    </Link>

                    <h2 className="px-10 text-3xl font-bold">USER DETAILS</h2>

                    <img
                        className="w-52 rounded-full shadow-2xl object-cover mt-2"
                        src={`${previewImageUrl ? previewImageUrl : imageUrl}`}
                        alt=""
                    />

                    <input
                        className="py-3 bg-transparent border-none text-center text-2xl font-bold outline-none"
                        type="email"
                        name="email"
                        value={username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <input
                        className="py-3 bg-transparent border-none text-center text-xl font-normal outline-none"
                        type="email"
                        name="email"
                        value={email}
                    />

                    <input ref={fileInput} className="invisible" type="file" accept="image/*" onChange={onImageChange} />

                    {previewImageUrl ? (
                        <button
                            className="w-full rounded-full bg-gradient-to-r from-[#E8B291] to-[#70A9B5] text-white font-extrabold drop-shadow-xl py-2 cursor-pointer"
                            onClick={handleSaveImage}
                        >
                            Save Image
                        </button>
                    ) : (
                        <button
                            className="w-full rounded-full bg-gradient-to-r from-[#70A9B5] to-[#E8B291] text-white font-extrabold drop-shadow-xl py-2 cursor-pointer"
                            onClick={handleButtonClick}
                        >
                            Change Image
                        </button>
                    )}
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Profile;
