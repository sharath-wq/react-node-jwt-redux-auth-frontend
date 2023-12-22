import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedAccessToken = localStorage.getItem("accessToken");

const initialState = {
    username: (storedUser && storedUser.username) || null,
    isAdmin: (storedUser && storedUser.isAdmin) || false,
    accessToken: storedAccessToken || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.isAdmin = action.payload.isAdmin;
            state.accessToken = action.payload.accessToken;

            localStorage.setItem(
                "user",
                JSON.stringify({
                    username: action.payload.username,
                    isAdmin: action.payload.isAdmin,
                })
            );
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        clearUser: (state) => {
            state.username = null;
            state.isAdmin = false;
            state.accessToken = null;

            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
    },
});

export const { setUser, clearUser, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
