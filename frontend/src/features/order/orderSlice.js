import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder ,updateOrder,fetchAllOrders} from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  totalOrders:0
};

export const addOrderByAsync = createAsyncThunk(
  'order/addOrder',
  async (order) => {
    const response = await addOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    },
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addOrderByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index] = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      });
  },
});

export const { increment,resetOrder } = orderSlice.actions;

export const selectOrder = (state) => state.order.orders;
export const currentOrder = (state) => state.order.currentOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
