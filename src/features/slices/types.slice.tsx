
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store'
import { EAPIStatus, IAPIError } from '../../shared/api/models';
import { getApiTypes } from '../../shared/api/type.api';
// import { fetchCount } from './AppExample2.api';

export interface IType {
  name: string,
  id: number
}
export interface IState {
  typesArray: IType[],
  name: string,
  id: number | null,
  status: EAPIStatus,
  error: IAPIError

}

const initialState: IState = {
  typesArray: [],
  name: "",
  id: null,
  status: EAPIStatus.IDLE,
  error: {
    message: "",
    code: -1
  }

};


export const getTypes = createAsyncThunk('types/getTypes', async () => {
  try {
    const response = await getApiTypes();
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});


export const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getTypes.pending, (state) => {
        state.status = EAPIStatus.PENDING;
        state.error.message = ""
        state.error.code = -1
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.typesArray = action.payload;
        state.status = EAPIStatus.FULFILLED;
      })
      .addCase(getTypes.rejected, (state, action: any) => {
        state.status = EAPIStatus.REJECTED;
        state.error.code = action.payload.httpCode;
        state.error.message = action.payload.statusMessage;
      });
  },
});

export const { } = typeSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;



export default typeSlice.reducer;
function rejectWithValue(data: any): any {
  throw new Error('Function not implemented.');
}

