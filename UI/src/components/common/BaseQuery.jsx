// BaseQuery.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { loginSuccess, logout } from "../../store/slicer/authSlice";
import RefreshTokenApi from "../../services/apis/RefreshToken";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include", // Ensures cookies (e.g., refresh token) are sent
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Access token expired. Attempting to refresh...");

    const refreshResult = await api.dispatch(
      RefreshTokenApi.endpoints.refreshToken.initiate()
    );

    if (refreshResult?.data) {
      // console.log("State after refresh:", api.getState());

      api.dispatch(
        loginSuccess({ user: api.getState().auth, accessToken: refreshResult?.data?.accessToken })
      );

      result = await baseQuery(args, api, extraOptions); // Retry the original query
    } 
    else {
      // console.log("Refresh token failed. Logging out...");
      api.dispatch(logout());
    }
  }

  return result;
};

export default baseQueryWithReauth;
