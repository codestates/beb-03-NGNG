import { createSlice } from '@reduxjs/toolkit';

const initialUserInfo = {id: '', nickname: '', email: '', emailToken: null, isVerified: false, privateKey: '', tokenAmount: 0};

export const userSlice = createSlice({
    name: "user",
    initialState: { isLogedIn: false, userInfo: initialUserInfo},
    reducers: {
        login: (state, action) => {
          state.isLogedIn = true;
          state.userInfo = action.payload;
        },
        logout: (state) => {
          state.isLogedIn = false;
          state.userInfo = initialUserInfo;
        }
    },
});

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
