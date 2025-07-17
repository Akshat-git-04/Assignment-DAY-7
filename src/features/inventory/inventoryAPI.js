// src/features/inventory/inventoryAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const inventoryAPI = createApi({
  reducerPath: 'inventoryAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // won't work without real backend — it's just structural
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Product', id }))
          : [{ type: 'Product' }],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: (result, error, product) => [{ type: 'Product', id: product.id }],
    }),
  }),
});

export const { useGetProductsQuery, useUpdateProductMutation } = inventoryAPI;
