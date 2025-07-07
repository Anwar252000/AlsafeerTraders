import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}Product/`, 
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
    getProductById: builder.query({
      query: (productId) => `Product/GetProductById?productId=${productId}`,
      providesTags: (result, error, productId) => [{ type: 'ProductById', id: productId }],
    }),

    getProductList: builder.query({
      query: () => `Product/GetProducts`,
      providesTags: ['ProductList'],
    }),

    addProduct: builder.mutation({
      query: (body) => {
        return {
          url: "Product/AddProduct",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['ProductList'],
    }),

    updateProduct: builder.mutation({
      query: ({body}) => {
        return {
          url: "Product/UpdateProduct",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, {body}) => ['ProductList', { type: 'ProductById', id: body.productId }],
    }),

    deleteProduct: builder.mutation({
      query: ({id}) => {
        return {
          url: `Product/DeleteProduct?productId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['ProductList'],
    }),
  }),
});

export const { useGetProductByIdQuery, useGetProductListQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = ProductApi;

export default ProductApi;
