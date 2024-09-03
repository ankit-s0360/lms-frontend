import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance"
import {toast} from "react-hot-toast";

const initialState = {
    allUserCount: 0,
    subscribedCount: 0
};

export const getStatsData = createAsyncThunk("/stats/get", async () => {
    try {
        const response = axiosInstance.get("/admin/stats/users");
        toast.promise(response, {
            loading: "Wait fetching the stats...",
            success: (data) => {
                // console.log(data)
                return data?.data?.message
            },
            error:"Failed to load data stats"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            // console.log("stat action", action);
            state.allUserCount = action?.payload?.statData?.allUserCount;
            state.subscribedCount = action?.payload?.statData?.subscriptions;
        })
    }
})

export default stateSlice.reducer;