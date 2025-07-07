import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const UserRoleApi = createApi({
  reducerPath: "UserRoleApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}UserRole/`, 
  //   // headers: {"Authorization": "Bearer "+localStorage.getItem("access_token")} }),
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
    getUserRoleById: builder.query({
      query: (userRoleId) => `UserRole/GetUserRoleById?userRoleId=${userRoleId}`,
      providesTags: (result, error, userRoleId) => [{ type: 'UserRoleById', id: userRoleId }],
    }),

    getUserRoleList: builder.query({
      query: () => `UserRole/GetUserRoles`,
      providesTags: ['UserRoleList'],
    }),

    addUserRole: builder.mutation({
      query: (body) => {
        return {
          url: "UserRole/AddUserRole",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['UserRoleList'],
    }),

    updateUserRole: builder.mutation({
      query: ({body}) => {
        return {
          url: "UserRole/UpdateUserRole",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, {body}) => ['UserRoleList', { type: 'UserRoleById', id: body.userRoleId }],
    }),

    deleteUserRole: builder.mutation({
      query: ({id}) => {
        return {
          url: `UserRole/DeleteUserRole?userRoleId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['UserRoleList'],
    }),
  }),
});

export const { useAddUserRoleMutation, useGetUserRoleByIdQuery, useGetUserRoleListQuery, useUpdateUserRoleMutation, useDeleteUserRoleMutation } = UserRoleApi;

export default UserRoleApi;
