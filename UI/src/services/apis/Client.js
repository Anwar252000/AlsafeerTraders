import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const ClientApi = createApi({
  reducerPath: "ClientApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}Client/`, 
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
    getClientById: builder.query({
      query: (clientId) => `Client/GetClientById?clientId=${clientId}`,
      providesTags: (result, error, clientId) => [{ type: 'ClientById', id: clientId }],
    }),

    getClientList: builder.query({
      query: () => `Client/GetClients`,
      providesTags: ['ClientList'],
    }),

    addClient: builder.mutation({
      query: (body) => {
        return {
          url: "Client/AddClient",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['ClientList'],
    }),

    updateClient: builder.mutation({
      query: ({body}) => {
        return {
          url: "Client/UpdateClient",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { body }) => ['ClientList', { type: 'ClientById', id: body.clientId }],
    }),

    deleteClient: builder.mutation({
      query: ({id}) => {
        return {
          url: `Client/DeleteClient?clientId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['ClientList'],
    }),
  }),
});

export const { useAddClientMutation, useGetClientByIdQuery, useUpdateClientMutation, useDeleteClientMutation, useGetClientListQuery  } = ClientApi;

export default ClientApi;
