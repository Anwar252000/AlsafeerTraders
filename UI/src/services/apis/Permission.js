import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const PermissionApi = createApi({
  reducerPath: "PermissionApi",
  // baseQuery: fetchBaseQuery({ 
  //   baseUrl: `${import.meta.env.VITE_BASE_URL}Permission/`, 
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
    getPermissionById: builder.query({
      query: (permissionId) => `Permission/GetPermissionById?permissionId=${permissionId}`,
      providesTags: (result, error, permissionId) => [{ type: 'PermissionById', id: permissionId }],
    }),

    getPermissionList: builder.query({
      query: () => `Permission/GetAllPermissions`,
      providesTags: ['PermissionList'],
    }),

    addPermission: builder.mutation({
      query: (body) => {
        return {
          url: "Permission/AddPermission",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['PermissionList'],
    }),

    updatePermission: builder.mutation({
      query: ({body}) => {
        return {
          url: "Permission/UpdatePermission",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, {body}) => ['PermissionList', { type: 'PermissionById', id: body.permissionId }],
    }),

    deletePermission: builder.mutation({
      query: ({id}) => {
        return {
          url: `Permission/DeletePermission?permissionId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['PermissionList'],
    }),

  }),
});

export const { useGetPermissionByIdQuery, useGetPermissionListQuery, useAddPermissionMutation, useUpdatePermissionMutation, useDeletePermissionMutation } = PermissionApi;

export default PermissionApi;
