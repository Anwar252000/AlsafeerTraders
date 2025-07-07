  import { createSlice } from "@reduxjs/toolkit";

  const storedUserInfo = JSON.parse(localStorage.getItem("user_info") || "{}");

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.exp * 1000 < Date.now();
  };

  const initialState = {
    userId: storedUserInfo.userId || null,
    username: storedUserInfo.username || null,
    name: storedUserInfo.name || null,
    roleName: storedUserInfo.roleName || null,
    isAuthenticated: !!storedUserInfo.userId,
    accessToken: localStorage.getItem("access_token"),
    permissions: JSON.parse(localStorage.getItem("permissions") || "[]"),
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        const user = action.payload.user;
        const accessToken = action.payload.accessToken;
        if (isTokenExpired(accessToken)) {
          console.warn("Received an expired token during login.");
          return;
        }
        state.userId = user.userId;
        state.username = user.username;
        state.name = user.name;
        state.roleName = user.roleName;
        state.isAuthenticated = true;
        state.accessToken = accessToken;
        localStorage.setItem("access_token", accessToken)
        localStorage.setItem("user_info", JSON.stringify(user));
      
      },
      logout: (state) => {
        state.userId = null;
        state.username = null;
        state.name = null;
        state.roleName = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        localStorage.removeItem("user_info");
        localStorage.removeItem("access_token");
        localStorage.removeItem("permissions");
      },

      setPermissions: (state, action) => {
        state.permissions = action.payload
        localStorage.setItem("permissions", JSON.stringify(action.payload));
      },

    //   validateToken: (state) => {
    //     console.log("Validating token...");
    //     const token = state.accessToken;
  
    //     if (isTokenExpired(token)) {
    //       console.warn("Token expired. Logging out...");

    //       const refreshToken = localStorage.getItem("refresh_token"); // Optional if using HttpOnly cookies
    //        if (!refreshToken || isTokenExpired(refreshToken)) {
    //         console.warn("Both tokens are expired. Logging out...");
    //       state.userId = null;
    //       state.username = null;
    //       state.name = null;
    //       state.roleName = null;
    //       state.isAuthenticated = false;
    //       state.accessToken = null;
  
    //       localStorage.clear();
    //     }
    //   }
    // },
    },
  });

  export const { loginSuccess, logout, validateToken } = authSlice.actions;
  export const selectUserId = (state) => state.auth.userId;
  export const selectUsername = (state) => state.auth.username;
  export const selectName = (state) => state.auth.name;
  export const selectRoleName = (state) => state.auth.roleName;
  export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
  export const selectAccessToken = (state) => state.auth.accessToken;
  export const selectPermissions = (state) => state.auth.permissions;

  export default authSlice.reducer;
