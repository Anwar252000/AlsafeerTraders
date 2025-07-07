import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const ShipmentApi = createApi({
  reducerPath: "ShipmentApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}Shipment/`, 
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
    getShipmentById: builder.query({
      query: (shipmentId) => `Shipment/GetShipmentById?shipmentId=${shipmentId}`,
      providesTags: (result, error, shipmentId) => [{ type: 'ShipmentById', id: shipmentId }],
    }),

    getShipmentList: builder.query({
      query: () => `Shipment/GetShipments`,
      providesTags: ['ShipmentList'],
    }),

    addShipment: builder.mutation({
      query: (body) => {
        return {
          url: "Shipment/AddShipment",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['ShipmentList'],
    }),

    updateShipment: builder.mutation({
      query: ({body}) => {
        return {
          url: "Shipment/UpdateShipment",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, {body}) => ['ShipmentList', { type: 'ShipmentById', id: body.shipmentId }],
    }),

    deleteShipment: builder.mutation({
      query: ({id}) => {
        return {
          url: `Shipment/DeleteShipment?shipmentId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['ShipmentList'],
    }),
  }),
});

export const { useGetShipmentByIdQuery, useGetShipmentListQuery, useAddShipmentMutation, useUpdateShipmentMutation, useDeleteShipmentMutation } = ShipmentApi;

export default ShipmentApi;
