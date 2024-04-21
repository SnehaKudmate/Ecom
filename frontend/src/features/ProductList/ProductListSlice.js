import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts ,fetchProductsByFilter,fetchAllCatgories,fetchAllBrands,fetchProductDetails,createProduct,updateProduct} from './ProductListApi';

const initialState = {
  products: [],
  status: 'idle',
  totalItem:0,
  categories: [],
  brands: [],
  productDetails:{}
};

//product
export const createProductByAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async ({filter,sort,pagination,admin }) => {
    const response = await fetchProductsByFilter(filter,sort,pagination,admin );
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);




export const fetchProductDetailsAsync = createAsyncThunk(
  'product/fetchProductDetails',
  async (id) => {
    const response = await fetchProductDetails(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);


//category
export const fetchAllCatgoriesAsync = createAsyncThunk(
  'product/fetchAllCatgories',
  async()=>{
    const response = await fetchAllCatgories();
    return response.data;
  }
)


//brands
export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async()=>{
    const response = await fetchAllBrands();
    return response.data;
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {      
      state.value += 1;
    },   
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.docs;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.docs;
        state.totalItem = action.payload.totalDocs
      })
      .addCase(fetchAllCatgoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCatgoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductDetailsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetailsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productDetails = action.payload;
      })
      .addCase(createProductByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
      })
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const totalDocs = (state) => state.product.totalItem;
export const categories = (state) => state.product.categories;
export const brands = (state) => state.product.brands;
export const productDetails = (state) => state.product.productDetails;
export const selectProductStatus = (state) => state.product.status;
export default productSlice.reducer;
