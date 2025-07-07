import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const ClientTypeApi = createApi({
  reducerPath: "ClientTypeApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}ClientType/`, 
  //   // headers: {"Authorization": "Bearer "+localStorage.getItem("access_token")}, 
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
    getClientTypeById: builder.query({
      query: (clientTypeId) => `ClientType/GetClientTypeById?clientTypeId=${clientTypeId}`,
      providesTags: (result, error, clientTypeId) => [{ type: "ClientTypeById", id: clientTypeId }],
    }),

    getClientTypeList: builder.query({
      query: () => `ClientType/GetClientTypes`,
      providesTags: ["ClientTypeList"],
    }),

    addClientType: builder.mutation({
      query: (body) => {
        return {
          url: "ClientType/AddClientType",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["ClientTypeList"],
    }),

    updateClientType: builder.mutation({
      query: ({body}) => {
        return {
          url: "ClientType/UpdateClientType",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, {body}) => ['ClientTypeList', { type: "ClientTypeById", id: body.clientTypeId }],
    }),

    deleteClientType: builder.mutation({
      query: ({id}) => {
        return {
          url: `ClientType/DeleteClientType?clientTypeId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ClientTypeList"],
    }),


  }),
});

export const { useGetClientTypeByIdQuery, useGetClientTypeListQuery, useAddClientTypeMutation, useUpdateClientTypeMutation, useDeleteClientTypeMutation } = ClientTypeApi;

export default ClientTypeApi;
