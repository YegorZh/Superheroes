import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PaginationData = {
  currentPage: number;
  itemsPerPage: number;
};

const initialState: PaginationData = { currentPage: 0, itemsPerPage: 5 };

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setPage, setItemsPerPage } = paginationSlice.actions;
export default paginationSlice.reducer;
