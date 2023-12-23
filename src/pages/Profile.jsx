import React, { useEffect, useRef, useState } from "react";
import Gradient from "../components/gradients/Gradient";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

const Profile = () => {
    const [image, setImage] = useState();
    const [previewImageUrl, setpreviewImageUrl] = useState();
    const fileInput = useRef(null);

    const dispatch = useDispatch();

    const token = useSelector((state) => state.userReducer.accessToken);

    const { _id, imageUrl, username } = useSelector((state) => state.userReducer.user);

    const [avatharImageUrl, setAvatharImageUrl] = useState(imageUrl);

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        if (!image) return;
        const newPreviewImageUrl = URL.createObjectURL(image);
        setpreviewImageUrl(newPreviewImageUrl);
        console.log(newPreviewImageUrl);
    }, [image]);

    useEffect(() => {}, [avatharImageUrl]);

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
            console.log(response);
            toast.success("Image uploaded successfully");
            dispatch(setUser(...response.user));
            setpreviewImageUrl("");
        } catch (error) {
            toast.error("Error uplaoding image");
            setpreviewImageUrl("");
        }
    };

    return (
        <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
            <Gradient color={"bg-[#B0E0E6]"} position={"top-0 left-0"} />
            <Gradient color={"bg-[#FFDAB9]"} position={"bottom-0 right-0"} />

            <div className="w-96 py-20 px-10 gap-5 px shadow-2xl rounded-3xl bg-white flex items-center flex-col justify-around">
                <h2 className="px-10 text-3xl font-bold">USER DETAILS</h2>

                <img
                    className="w-52 rounded-full shadow-2xl object-cover"
                    src={`${previewImageUrl ? previewImageUrl : avatharImageUrl}`}
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
    );
};

export default Profile;
