import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getType } from "../api/type";
export const getTypeList = createAsyncThunk("type/getTypeList", async () => {
  const response = await getType();
  // 返回的是一个promise
  return response.data;
});
const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, action) => {
      state.typeList = action.payload
    });
  },
});

export default typeSlice.reducer;
