import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const InvoiceApi = createApi({
  reducerPath: "InvoiceApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}Invoice/`, 
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
    getInvoiceById: builder.query({
      query: (invoiceId) => `Invoice/GetInvoiceById?invoiceId=${invoiceId}`,
      providesTags: (result, error, invoiceId) => [{ type: 'InvoiceById', id: invoiceId }],
    }),

    getInvoiceList: builder.query({
      query: () => `Invoice/GetInvoices`,
      providesTags: ['InvoiceList'],
    }),

    addInvoice: builder.mutation({
      query: (body) => {
        return {
          url: "Invoice/AddInvoice",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['InvoiceList'],
    }),

    updateInvoice: builder.mutation({
      query: ({body}) => {
        return {
          url: "Invoice/UpdateInvoice",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, {body}) => ['InvoiceList', { type: 'InvoiceById', id: body.invoiceId }],
    }),

    deleteInvoice: builder.mutation({
      query: ({id}) => {
        return {
          url: `Invoice/DeleteInvoice?invoiceId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['InvoiceList'],
    }),
  }),
});

export const { useGetInvoiceByIdQuery, useGetInvoiceListQuery, useAddInvoiceMutation, useUpdateInvoiceMutation, useDeleteInvoiceMutation } = InvoiceApi;

export default InvoiceApi;
