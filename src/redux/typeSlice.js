import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getType } from "../api/type";
export const getTypeList = createAsyncThunk(
  "type/getTypeList",
  async (_, action) => {
    const response = await getType();
    console.log(response);
  }
);
const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [],
  },
  reducers: {},
});

export default typeSlice.reducer;
