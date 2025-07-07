import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RefreshTokenApi = createApi({
  reducerPath: "RefreshTokenApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}User/`, 
    // // headers: {"Authorization": "Bearer "+localStorage.getItem("access_token")} 
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.accessToken; 

    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }

    //   return headers;
    // }  
  }),
  endpoints: (builder) => ({
   
    refreshToken: builder.mutation({
      query: () => ({
        url: `RefreshToken`,
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent with the request
      }),
    }),
  }),
});

export const { useRefreshTokenMutation } = RefreshTokenApi;

export default RefreshTokenApi;
