import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    isAdmin: false,
    accessToken: localStorage.getItem("accessToken") || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.name;
            state.isAdmin = action.payload.isAdmin;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        clearUser: (state) => {
            state.username = null;
            state.isAdmin = false;
            state.accessToken = null;
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
