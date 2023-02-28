import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store'
import { IAnswer, IFilter } from './answers.slice';
import { getApiFilteredQuestions, getApiQuestions, postAddQuestion } from '../../shared/api/question.api';
import { EAPIStatus, IAPIError } from '../../shared/api/models';
// import { fetchCount } from './AppExample2.api';

export interface IQuestion {
  text: string,
  typeId: number | null,
  correctAnswer?: string | null,
  answersArray: IAnswer[];
  id: number,
  quizId: number | null
  // status: 'idle' | 'loading' | 'failed';
}
export interface IQuestionCreate {
  text: string,
  typeId: number | null,
  correctAnswer?: string | null,
  answersArray: IAnswer[];
  quizId: number | null
  // status: 'idle' | 'loading' | 'failed';
}
export interface IState {
  allQue: IQuestion[],
  currentQuizQuestions: IQuestion[]
  newQuestionId: number,
  status: EAPIStatus;
  error: IAPIError
}

const initialState: IState = {
  allQue: [],
  currentQuizQuestions: [],
  newQuestionId: -1,
  status: EAPIStatus.IDLE,
  error: {
    message: "",
    code: -1
  }
};


export const getQuestions = createAsyncThunk('question/getQuestions', async (payload: IFilter, { rejectWithValue }) => {
  try {
    const response = await getApiFilteredQuestions(payload);
    return response.data.data;
  }
  catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addQuestion = createAsyncThunk('question/addQuestion', async (payload: IQuestionCreate, { rejectWithValue }) => {
  try {
    const response = await postAddQuestion(payload);
    return response.data.data;
  }
  catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});


export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    resetQuestionId: (state) => {
      state.newQuestionId = -1;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getQuestions.pending, (state) => {
        state.status = EAPIStatus.PENDING;
        state.error.message = ""
        state.error.code = -1
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.currentQuizQuestions = action.payload;
        state.status = EAPIStatus.FULFILLED;
      })
      .addCase(getQuestions.rejected, (state, action: any) => {
        state.status = EAPIStatus.REJECTED;
        state.error.code = action.payload.httpCode;
        state.error.message = action.payload.statusMessage;
      })
      .addCase(addQuestion.pending, (state) => {
        state.status = EAPIStatus.PENDING;
        state.error.message = ""
        state.error.code = -1
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.newQuestionId = action.payload;
        state.status = EAPIStatus.FULFILLED;
      })
      .addCase(addQuestion.rejected, (state, action: any) => {
        state.status = EAPIStatus.REJECTED;
        state.error.code = action.payload.httpCode;
        state.error.message = action.payload.statusMessage;
      });

  }
});

export const { resetQuestionId } = questionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//     (dispatch, getState) => {
//       const currentValue = selectCount(getState());
//       if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//       }
//     };

export default questionSlice.reducer;
