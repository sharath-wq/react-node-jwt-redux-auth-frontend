import React, { useEffect, useRef, useState } from "react";
import Gradient from "../components/gradients/Gradient";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
    const [image, setImage] = useState();
    const [previewImageUrl, setpreviewImageUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const [username, setUsename] = useState();
    const [email, setEmail] = useState();
    const fileInput = useRef(null);

    const token = useSelector((state) => state.userReducer.accessToken);

    const _id = useSelector((state) => state.userReducer.user._id);

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        console.log("fetching");
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:4000/profile/${_id}`);

            if (response.statusText === "OK") {
                const { username, email, imageUrl } = response.data.user;
                console.log(username, email, imageUrl);

                setImageUrl(imageUrl);
                setEmail(email);
                setUsename(username);
            }
        };

        fetchUser();
    }, [username, imageUrl, email]);

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

    return (
        <>
            <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
                <Gradient color={"bg-[#B0E0E6]"} position={"top-0 left-0"} />
                <Gradient color={"bg-[#FFDAB9]"} position={"bottom-0 right-0"} />

                <div className="w-96 py-20 px-10 gap-5 px shadow-2xl rounded-3xl bg-white flex items-center flex-col justify-around">
                    <h2 className="px-10 text-3xl font-bold">USER DETAILS</h2>

                    <img
                        className="w-52 rounded-full shadow-2xl object-cover"
                        src={`${previewImageUrl ? previewImageUrl : imageUrl}`}
                        alt=""
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
