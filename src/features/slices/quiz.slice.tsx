import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store'
import { getApiFilteredQuizzes, getApiQuiz, getApiQuizzes, postApiCreateQuiz, vote } from '../../shared/api/quiz.api';
import { getApiAnswers, getApiFilteredAnswers } from '../../shared/api/answer.api';
import { IAnswer, IFilter } from './answers.slice';
import { EAPIStatus, IAPIError } from '../../shared/api/models';
// import { fetchCount } from './AppExample2.api';

export interface IFullQuiz {
  quiz: {
    name: string
    id: number,
    description: string,
  },
  questionsArray: [
    {
      text: string,
      id: number,
      typeId: number,
      quizId: number,
      answersArray: IAnswer[]
    }
  ]
}
export interface IQuiz {
  name: string
  id: number,
  description: string,
}
export interface IGetFullQizRequest {
  quizId: number,
  fullDetails: boolean,
}
export interface IQuizCreate {
  name: string
  description: string,
}
export interface ISOlvedQuiz {
  quizId: number,
  answersArray: {
    questionId: number,
    answerId: number
  }[]
}
interface IState {
  currentQuiz: IFullQuiz,
  allQuizzes: IQuiz[],
  // filteredQuizzes: IQuiz[],
  results: IFullQuiz,
  newQuizId: number,
  currentUserAnswers: ISOlvedQuiz,
  status: EAPIStatus;
  error: IAPIError
}

const initialState: IState = {
  currentQuiz: {
    quiz: {
      name: "",
      id: -1,
      description: "",
    },
    questionsArray: [
      {
        text: "",
        id: -1,
        typeId: -1,
        quizId: -1,
        answersArray: []
      }
    ]
  },
  allQuizzes: [],
  // filteredQuizzes: [],
  results: {
    quiz: {
      name: "",
      id: -1,
      description: "",
    },
    questionsArray: [
      {
        text: "",
        id: -1,
        typeId: -1,
        quizId: -1,
        answersArray: []
      }
    ]
  },
  newQuizId: -1,
  currentUserAnswers: {
    quizId: -1,
    answersArray: []
  },
  status: EAPIStatus.IDLE,
  error: {
    message: "",
    code: -1
  }

};


export const getQuizzes = createAsyncThunk('quiz/getQuizzes', async () => {
  try {
    const response = await getApiQuizzes();
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const getFilteredQuizzes = createAsyncThunk('quiz/getFilteredQuizzes', async (obj: IFilter, { rejectWithValue }) => {
  try {
    const response = await getApiFilteredQuizzes(obj);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const createQuiz = createAsyncThunk('quiz/createQuiz', async (payload: IQuizCreate, { rejectWithValue }) => {
  try {
    const response = await postApiCreateQuiz(payload);
    return response.data.data;

  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
//for empty quiz
export const getQuiz = createAsyncThunk('quiz/getQuiz', async (quizId: number, { rejectWithValue }) => {
  try {
    const response = await getApiQuiz({ quizId, fullDetails: false });
    return response.data.data;
  }
  catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
//for a quiz  with correct answers and a number of votes
export const getFullQuiz = createAsyncThunk('quiz/getFullQuiz', async (quizId: number, { rejectWithValue }) => {
  try {
    const response = await getApiQuiz({ quizId: quizId, fullDetails: true });
    return response.data.data;
  }
  catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const voteQuiz = createAsyncThunk('quiz/voteQuiz', async (payload: ISOlvedQuiz, { rejectWithValue }) => {
  try {
    const response = await vote(payload);
    return response.data.data;
  }
  catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});




export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    saveAnswers: (state, action: { payload: ISOlvedQuiz }) => {
      state.currentUserAnswers = action.payload;
    },
    resetQuizId: (state) => {
      state.newQuizId = -1;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getQuizzes.pending, (state) => {
        state.status = EAPIStatus.PENDING;
        state.error.message = ""
        state.error.code = -1
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.allQuizzes = action.payload;
        state.status = EAPIStatus.FULFILLED;
      })
      .addCase(getQuizzes.rejected, (state, action: any) => {
        state.status = EAPIStatus.REJECTED;
        state.error.code = action.payload.httpCode;
        state.error.message = action.payload.statusMessage;

      })

      .addCase(getFilteredQuizzes.pending, (state) => {
        state.status = EAPIStatus.PENDING;
        state.error.message = ""
        state.error.code = -1
      })
      .addCase(getFilteredQuizzes.fulfilled, (state, action) => {
        state.allQuizzes = action.payload;
        state.status = EAPIStatus.FULFILLED;
      })
      .addCase(getFilteredQuizzes.rejected, (state, action: any) => {
        state.status = EAPIStatus.REJECTED;
        state.error.code = action.payload.httpCode;
        state.error.message = action.payload.statusMessage;

      })

      .addCase(createQuiz.pending, (state) => {
        state.status = EAPIStatus.PENDING;
        state.error.message = ""
        state.error.code = -1
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.status = EAPIStatus.FULFILLED;
        state.newQuizId = action.payload;
      })
      .addCase(createQuiz.rejected, (state, action: any) => {
        state.status = EAPIStatus.REJECTED;
        state.error.code = action.payload.httpCode;
        state.error.message = action.payload.statusMessage;

      })
      .addCase(getQuiz.pending, (state) => {
        state.status = EAPIStatus.PENDING;
        state.error.message = ""
        state.error.code = -1
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.currentQuiz = action.payload;
        state.status = EAPIStatus.FULFILLED;
      })
      .addCase(getQuiz.rejected, (state, action: any) => {
        state.status = EAPIStatus.REJECTED;
        state.error.code = action.payload.httpCode;
        state.error.message = action.payload.statusMessage;

      })
      .addCase(getFullQuiz.pending, (state) => {
        state.status = EAPIStatus.PENDING;
        state.error.message = ""
        state.error.code = -1
      })
      .addCase(getFullQuiz.fulfilled, (state, action) => {
        state.results = action.payload;
        state.status = EAPIStatus.FULFILLED;
      })
      .addCase(getFullQuiz.rejected, (state, action: any) => {
        state.status = EAPIStatus.REJECTED;
        state.error.code = action.payload.httpCode;
        state.error.message = action.payload.statusMessage;

      })
      .addCase(voteQuiz.pending, (state) => {
        state.status = EAPIStatus.PENDING;
        state.error.message = ""
        state.error.code = -1
      })
      .addCase(voteQuiz.fulfilled, (state, action) => {
        state.status = EAPIStatus.FULFILLED;
      })
      .addCase(voteQuiz.rejected, (state, action: any) => {
        state.status = EAPIStatus.REJECTED;
        state.error.code = action.payload.httpCode;
        state.error.message = action.payload.statusMessage;
      })

  },
});

export const { saveAnswers, resetQuizId } = quizSlice.actions;

export default quizSlice.reducer;
function rejectWithValue(data: any): any {
  throw new Error('Function not implemented.');
}

