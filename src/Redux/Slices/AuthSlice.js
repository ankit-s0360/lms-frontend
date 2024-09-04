import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";

const localData = () => {
    const data = localStorage.getItem('data');
    try {
        return data ? JSON.parse(data) : {}; // Parse or default to empty object
    } catch (e) {
        console.error('Failed to parse JSON from localStorage', e);
        return {}; // Fallback to an empty object if parsing fails
    }
}
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localData,
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        // console.log("data", data);
        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("avatar", data.avatar);
        
        // if you also pass data directly it will also work
        const res = axiosInstance.post("user/register", formData, { withCredentials: true });
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        // console.log(res);
        
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data, { withCredentials: true });
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout", async () => {
    try{
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to logout"
        });
        
        return (await res).data;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})

export const changePassword = createAsyncThunk("/auth/change-password", async (data) => {
    try {
        const res = axiosInstance.post("user/change-password", data);
        toast.promise(res, {
            loading: "Wait! password changing in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to change password"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn =  true;
            // console.log("user login action", action);
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            // console.log("user action", action);
            
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            // console.log("user action", action);
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        });
    }
});

export const {} = authSlice.actions;
export default authSlice.reducer;