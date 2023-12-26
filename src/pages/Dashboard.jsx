import { Link } from "react-router-dom";
import Gradient from "../components/gradients/Gradient";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
    const [users, setUsers] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            setIsFetching(true);
            try {
                const response = await axios.get(`http://localhost:4000/users?page=${page}`);
                setUsers(response.data.users);
                setPageInfo(response.data.pageInfo);
                setIsFetching(false);
            } catch (error) {
                setIsFetching(false);
                console.error(error);
            }
        };

        fetchUsers();
    }, [page]);

    const handlePreviousClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = () => {
        setPage(page + 1);
    };

    const openModal = (id) => {
        setUserId(id);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:4000/user/${id}/delete`)
            .then((response) => response.data)
            .then((data) => {
                if (data.success === true) {
                    const newUsers = users.filter((user) => user._id !== userId);
                    setUsers(newUsers);
                    toast.success("User Deleted Successfully");
                    closeModal();
                } else {
                    toast.error("Can't remove user");
                    closeModal();
                }
            })
            .catch((error) => {
                console.log(error);
                closeModal();
            });
    };

    return (
        <>
            <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
                <Gradient color={"bg-[#FFDAB9]"} positon={"-top-72 -right-72"} />
                <Gradient color={"bg-[#F0E68C]"} positon={"-bottom-72 -left-72"} />

                <div className="w-[80%] py-20 px-10 gap-2 px shadow-2xl rounded-3xl bg-white flex items-center flex-col  relative">
                    <Link className="absolute top-6 left-5" to="/">
                        <IoArrowBack className=" text-gray-500 text-2xl" />
                    </Link>
                    <h2 className="px-10 text-3xl font-bold absolute top-10">ADMIN DASHBOARD</h2>

                    <button
                        className="absolute top-6 right-6 px-4 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-extrabold drop-shadow-xl py-2"
                        type="submit"
                    >
                        Add User
                    </button>

                    {/* Search */}

                    <div class="relative w-[80%] mt-5">
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none "
                            placeholder="Search Users"
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-gray-800  font-medium rounded-lg text-sm px-4 py-2 "
                        >
                            Search
                        </button>
                    </div>

                    {/* Search End */}

                    {/* Table */}

                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-10">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Joined date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.length ? (
                                    users.map((user) => (
                                        <tr key={user._id} className="bg-white border-b ">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                            >
                                                {user?.email}
                                            </th>
                                            <td className="px-6 py-4">{user?.username}</td>
                                            <td className="px-6 py-4">{new Date(user?.createdAt).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right ">
                                                <Link
                                                    to={`/admin/user/${user?._id}`}
                                                    href="#"
                                                    className="font-medium text-green-600 hover:underline"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    to={`/admin/user/${user?._id}/edit`}
                                                    className="font-medium text-blue-600 hover:underline ml-3"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    data-modal-target="popup-modal"
                                                    data-modal-toggle="popup-modal"
                                                    className="font-medium text-red-600 hover:underline ml-3 "
                                                    onClick={() => openModal(user?._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <h1 className="p-4">No Users Found</h1>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table */}

                    {/* pagination */}
                    {pageInfo?.totalPages !== 1 && (
                        <div className="flex mt-6">
                            <button
                                onClick={handlePreviousClick}
                                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg disabled:bg-gray-100"
                                disabled={pageInfo?.hasPrevPage ? false : true}
                            >
                                Previous
                            </button>

                            <button
                                onClick={handleNextClick}
                                className="flex items-center justify-center px-3 ms-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg disabled:bg-gray-100"
                                disabled={pageInfo?.hasNextPage ? false : true}
                            >
                                Next
                            </button>
                        </div>
                    )}
                    {/* pagination end */}
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3
                                                className="text-base font-semibold leading-6 text-gray-900"
                                                id="modal-title"
                                            >
                                                Delete User
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to Delete this user account? All of this user data
                                                    will be permanently removed. This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        onClick={() => handleDelete(userId)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal End */}
            <Toaster />
        </>
    );
};

export default Dashboard;
