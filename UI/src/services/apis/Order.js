import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}Order/`, 
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
    getOrderById: builder.query({
      query: (orderId) => `Order/GetOrderById?orderId=${orderId}`,
      providesTags: (result, error, orderId) => [{ type: 'OrderById', id: orderId }],
    }),

    getOrderList: builder.query({
      query: () => `Order/GetOrders`,
      providesTags: ['OrderList'],
    }),

    addOrder: builder.mutation({
      query: (body) => {
        return {
          url: "Order/AddOrder",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['OrderList'],
    }),

    updateOrder: builder.mutation({
      query: ({body}) => {
        return {
          url: "Order/UpdateOrder",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, {body}) => ['OrderList', { type: 'OrderById', id: body.orderId }],
    }),

    deleteOrder: builder.mutation({
      query: ({id}) => {
        return {
          url: `Order/DeleteOrder?orderId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['OrderList'],
    }),
  }),
});

export const { useGetOrderByIdQuery, useGetOrderListQuery, useAddOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation  } = OrderApi;

export default OrderApi;
