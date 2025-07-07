import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const UserPermissionApi = createApi({
  reducerPath: "UserPermissionApi",
  // baseQuery: fetchBaseQuery({ 
  //   baseUrl: `${import.meta.env.VITE_BASE_URL}UserPermission/`, 
  //   // headers: {"Authorization": "Bearer " + localStorage.getItem("access_token")}
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
    getUserPermissionById: builder.query({
      query: (userPermissionId) => `UserPermission/GetUserPermissionById?userPermissionId=${userPermissionId}`,
      providesTags: (result, error, userPermissionId) => [{ type: 'UserPermissionById', id: userPermissionId }],
    }),

    getUserPermissionList: builder.query({
      query: () => `UserPermission/GetUserPermissions`,
      
    }),

    getUserPermission: builder.query({
      query: (userId) => `UserPermission/GetUserPermission?userId=${userId}`,
      providesTags: ['UserPermission'],
    }),

    addUserPermission: builder.mutation({
      query: (body) => {
        return {
          url: "UserPermission/AddUserPermission",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['UserPermission'],
    }),

    updateUserPermission: builder.mutation({
      query: ({body}) => {
        return {
          url: "UserPermission/UpdateUserPermission",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, {body}) => ['UserPermission', { type: 'UserPermissionById', id: body.userPermissionId }],
    }),

    deleteUserPermission: builder.mutation({
      query: ({id}) => {
        return {
          url: `UserPermission/DeleteUserPermission?userPermissionId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['UserPermission'],
    }),
  }),
});

export const { useGetUserPermissionByIdQuery, useGetUserPermissionListQuery, useAddUserPermissionMutation, useUpdateUserPermissionMutation, useDeleteUserPermissionMutation, useGetUserPermissionQuery } = UserPermissionApi;

export default UserPermissionApi;
