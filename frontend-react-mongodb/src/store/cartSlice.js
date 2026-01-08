/**
 * Redux slice for shopping cart state management.
 * Handles product addition, removal, quantity updates, and cart clearing.
 * State shape: { products: [] }.
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.orderedQuantity += product.orderedQuantity;
      } else {
        state.products.push(product);
      }
    },
    removeProduct: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter(product => product.id !== id);
    },
    updateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find(product => product.id === id);
      if (product) {
        product.orderedQuantity = quantity;
      }
    },
    clearCart: (state) => {
      state.products = [];
    }
  },
});
export const { addProduct, removeProduct, updateProductQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;