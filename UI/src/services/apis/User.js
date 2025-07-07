import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const UserApi = createApi({
  reducerPath: "UserApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}User/`, 
  //   // headers: {"Authorization": "Bearer "+localStorage.getItem("access_token")} 
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = getState().auth.accessToken; 

  //     if (token) {
  //       headers.set('Authorization', `Bearer ${token}`);
  //     }

  //     return headers;
  //   }  
  // }),
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `User/GetUserById?userId=${userId}`,
      providesTags: (result, error, userId) => [{ type: 'UserById', id: userId }],
    }),

    getUserList: builder.query({
      query: () => `User/GetUsers`,
      providesTags: ['UserList'],
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: `User/LoginUser`, 
        method: 'POST',
        body, 
      }),
    }),

    // refreshToken: builder.mutation({
    //   query: () => ({
    //     url: `User/RefreshToken`,
    //     method: 'POST',
    //     credentials: 'include', // Ensures cookies are sent with the request
    //   }),
    // }),

    addUser: builder.mutation({
      query: (body) => {
        return {
          url: "User/AddUser",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['UserList'],
    }),

    updateUser: builder.mutation({
      query: ({body}) => {
        return {
          url: "User/UpdateUser",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, {body}) => ['UserList', { type: 'UserById', id: body.userId }],
    }),

    deleteUser: builder.mutation({
      query: ({id}) => {
        return {
          url: `User/DeleteUser?userId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['UserList'],
    }),

    resetPassword: builder.mutation({
      query: ({ body }) => ({
        url: "User/ResetPassword",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useGetUserListQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation, useLoginUserMutation, useResetPasswordMutation, useRefreshTokenMutation } = UserApi;

export default UserApi;
