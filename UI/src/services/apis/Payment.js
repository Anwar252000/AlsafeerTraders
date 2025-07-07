import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const PaymentApi = createApi({
  reducerPath: "PaymentApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}Payment/`, 
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
  tagTypes: ['PaymentList', 'PaymentById'],
  endpoints: (builder) => ({
    getPaymentById: builder.query({
      query: (paymentId) => `Payment/GetPaymentById?paymentId=${paymentId}`,
      providesTags: (result, error, paymentId) => [{ type: 'PaymentById', id: paymentId }],
    }),

    getPaymentList: builder.query({
      query: () => `Payment/GetPayments`,
      providesTags: ['PaymentList'],
    }),

    addPayment: builder.mutation({
      query: (body) => {
        return {
          url: "Payment/AddPayment",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['PaymentList'],
    }),

    updatePayment: builder.mutation({
      query: ({body}) => {
        return {
          url: "Payment/UpdatePayment",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { body }) => ['PaymentList',{ type: 'PaymentById', id: body.paymentId }],
    }),

    deletePayment: builder.mutation({
      query: ({id}) => {
        return {
          url: `Payment/DeletePayment?paymentId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['PaymentList'],
    }),
  }),
});

export const { useGetPaymentByIdQuery, useGetPaymentListQuery, useAddPaymentMutation, useUpdatePaymentMutation, useDeletePaymentMutation  } = PaymentApi;

export default PaymentApi;
