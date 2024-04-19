import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,fetchItemsByUserId,updateCart ,resetCart,deleteItemFromCard} from './cartApi';

const initialState = {
  status: 'idle',
  items: [],
  cartLoaded: false
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (data) => {
    const response = await addToCart(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchItemsByUserIdByAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchItemsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (data) => {
    const response = await updateCart(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
)

export const deleteItemFromCardByAsync = createAsyncThunk(
  'cart/deleteItemFromCard',
  async (data) => {
    const response = await deleteItemFromCard(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
)

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {      
      state.value += 1;
    },   
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.cartItem.findIndex(item=>item.id === action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCardByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCardByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id === action.payload.id)
        state.items.splice(index,1)
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCart = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;



export default cartSlice.reducer;
