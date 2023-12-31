import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedAccessToken = localStorage.getItem("accessToken");

const initialState = {
    user: storedUser || null,
    accessToken: storedAccessToken || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;

            localStorage.setItem(
                "user",
                JSON.stringify({
                    user: { ...action.payload.user },
                })
            );
            localStorage.setItem("accessToken", action?.payload?.accessToken);
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        clearUser: (state) => {
            state.user = null;
            state.accessToken = null;

            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        },
        clearAccessToken: (state) => {
            (state.accessToken = null), localStorage.removeItem("accessToken");
        },
    },
});

export const { setUser, clearUser, setAccessToken, clearAccessToken } = userSlice.actions;

export default userSlice.reducer;
