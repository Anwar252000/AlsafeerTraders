import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../components/common/BaseQuery";

export const ExpenseApi = createApi({
  reducerPath: "ExpenseApi",
  // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}Expense/`, 
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
    getExpenseById: builder.query({
      query: (expenseId) => `Expense/GetExpenseById?expenseId=${expenseId}`,
      providesTags: (result, error, expenseId) => [{ type: 'ExpenseById', id: expenseId }],
    }),

    getExpenseList: builder.query({
      query: () => `Expense/GetExpenses`,
      providesTags: ['ExpenseList'],
    }),

    addExpense: builder.mutation({
      query: (body) => {
        return {
          url: "Expense/AddExpense",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ['ExpenseList'],
    }),

    updateExpense: builder.mutation({
      query: ({body}) => {
        return {
          url: "Expense/UpdateExpense",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { body }) => ['ExpenseList', { type: 'ExpenseById', id: body.expenseId }],
    }),

    deleteExpense: builder.mutation({
      query: ({id}) => {
        return {
          url: `Expense/DeleteExpense?expenseId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['ExpenseList'],
    }),
  }),
});

export const { useGetExpenseByIdQuery, useGetExpenseListQuery, useAddExpenseMutation, useUpdateExpenseMutation, useDeleteExpenseMutation } = ExpenseApi;

export default ExpenseApi;
