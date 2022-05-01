import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PaginationData = {
  currentPage: number;
  itemsPerPage: number;
  itemsTotal: number;
};

const initialState: PaginationData = {
  currentPage: 0,
  itemsPerPage: 5,
  itemsTotal: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      const targetRow = state.currentPage * state.itemsPerPage;
      state.itemsPerPage = action.payload;
      state.currentPage = Math.floor(targetRow / state.itemsPerPage);
    },
  },
});

export const { setPage, setItemsPerPage } = paginationSlice.actions;
export default paginationSlice.reducer;
