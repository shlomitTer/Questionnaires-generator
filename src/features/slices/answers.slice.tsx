import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store'
import { apiVote, getApiAnswers, getApiFilteredAnswers } from '../../shared/api/answer.api';
// import { fetchCount } from './AppExample2.api';

export interface IAnswer {
  text: string
  id?: number,
  questionId?: number,
  isCorrect?: boolean,
  numbersOfVotes?: number
}
export interface IInputVote {
  questionId: number,
  answerId: number
}
//להוציא מחוץ לדף הזה 
export interface IFilter {
  filter: {
    questionId?: number[] | number,
    quizId?: number[] | number | null,
    id?: number[] | number
  }
}
export interface IState {
  answersArray: IAnswer[],
  currentAnswer: IAnswer,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IState = {
  answersArray: [],
  currentAnswer: { text: "" },
  status: 'idle',
};


export const getAnswers = createAsyncThunk('answer/getAnswers', async (id: string) => {
  const response = await getApiAnswers(id);
  return response.data;
});
export const getFilteredAnswers = createAsyncThunk('answer/getFilteredAnswers', async (obj: IFilter) => {

  const response = await getApiFilteredAnswers(obj);

  return response.data;
});
export const voteForAnswer = createAsyncThunk('answer/voteForAnswer', async (obj: IInputVote) => {
  const response = await apiVote(obj);
  return response.data;
});



export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getAnswers.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(getAnswers.fulfilled, (state, action) => {

        state.answersArray = action.payload;

        // state.status = 'idle';
      })
      .addCase(getAnswers.rejected, (state) => {
        // state.status = 'failed';
      })

      .addCase(getFilteredAnswers.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(getFilteredAnswers.fulfilled, (state, action) => {
        state.answersArray = action.payload;

        // state.status = 'idle';
      })
      .addCase(getFilteredAnswers.rejected, (state) => {
        // state.status = 'failed';
      })

      .addCase(voteForAnswer.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(voteForAnswer.fulfilled, (state, action) => {
        state.currentAnswer = action.payload[0]
        // state.status = 'idle';
      })
      .addCase(voteForAnswer.rejected, (state) => {
        // state.status = 'failed';
      });

  },
});

export const { } = answerSlice.actions;


export const selectCount = (state: RootState) => state.counter.value;


export default answerSlice.reducer;
