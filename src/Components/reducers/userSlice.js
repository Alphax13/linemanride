import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import liff from "@line/liff";

const baseurlDev = 'https://games.myworld-store.com/api-code-dev';
const baseurl = 'https://games.myworld-store.com/api-code';

//endpoint
const collectUrl = `${baseurlDev}/collectCode`;

function mobileCheck() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobile = /(android|bb\d+|meego|iphone|ipad|ipod|webos|blackberry|iemobile|opera mini)/i.test(userAgent);
  const hasRedirected = sessionStorage.getItem("mobileRedirected");

  if (isMobile && !hasRedirected) {
    sessionStorage.setItem("mobileRedirected", "true");
    return true;
  }

  return false;
}

function isDesktop() {
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    userAgent.indexOf("windows") !== -1 ||
    userAgent.indexOf("macintosh") !== -1 ||
    userAgent.indexOf("linux") !== -1
  );
}

export const loginWithLine = createAsyncThunk(
  "user/loginWithLine",
  async (_, { rejectWithValue }) => {
    try {
      if (isDesktop()) {
        await liff.init({ liffId: "2002643017-rN6bKJvZ" });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const profile = await liff.getProfile();
        return profile;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const redirected = urlParams.get("redirected");

      if (mobileCheck() && !redirected) {
        window.location.href = "line://app/2002643017-rN6bKJvZ?redirected=true";
        return;
      }

      await liff.init({ liffId: "2002643017-rN6bKJvZ" });

      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const profile = await liff.getProfile();
      return profile;

    } catch (error) {
      return rejectWithValue(error.message || "Failed to login with LINE");
    }
  }
);



export const collectCode = createAsyncThunk(
  'user/collectCode',
  async ({ profile, phone }, { rejectWithValue }) => {
    // console.log("Sending request to API with data:", { profile, phone });
    try {
      const response = await axios.post(collectUrl,
        {
          name: profile.displayName,
          phone: phone,
          line_id: profile.userId + '1',
          picture: profile.pictureUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'Sw9bxBY01ZgxXOCHK_ycKh6nwuTM0018W3E83iZbNpY',
            // 'ngrok-skip-browser-warning':true
          },
        }
      );
      // console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      // console.error("Error occurred:", error.response || error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
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
      })
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
        if (action.payload?.code === "ALREADY_REDEEM_TODAY") {
          state.response = action.payload;
        } else {
          state.error = action.payload;
        }
      });
  },
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;