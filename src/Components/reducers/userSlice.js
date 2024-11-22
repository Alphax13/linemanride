import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import liff from "@line/liff";

const baseurlDev = 'https://games.myworld-store.com/api-code-dev';
const baseurl = 'https://games.myworld-store.com/api-code';

// Thunk สำหรับการ Login LINE และดึงข้อมูลโปรไฟล์
export const loginWithLine = createAsyncThunk(
  'user/loginWithLine',
  async (_, { rejectWithValue }) => {
    try {
      await liff.init({ liffId: '2002643017-rN6bKJvZ' }); // ใส่ LIFF ID
      if (!liff.isLoggedIn()) {
        liff.login(); // Redirect ไปยังหน้า Login ของ LINE
      }
      const profile = await liff.getProfile();
      return profile; // คืนค่า profile
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to login with LINE'
      );
    }
  }
);

export const collectCode = createAsyncThunk(
  'user/collectCode',
  async ({ profile, phone }, { rejectWithValue }) => {
    console.log("Sending request to API with data:", { profile, phone });
    try {
      const response = await axios.post(
        `${baseurlDev}/collectCode`,
        {
          name: profile.displayName,
          phone: phone,
          line_id: profile.userId,
          picture: profile.pictureUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'Sw9bxBY01ZgxXOCHK_ycKh6nwuTM0018W3E83iZbNpY',
          },
        }
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error.response || error.message);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to collect code'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    isLoading: false,
    error: null,
    response: null,
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithLine.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithLine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(loginWithLine.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(collectCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(collectCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
      })
      .addCase(collectCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;