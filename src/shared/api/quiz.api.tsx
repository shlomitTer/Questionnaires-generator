import axios from "axios";
import { API_ROUTES, API_URL } from "../../app/constants";
import { IFilter } from "../../features/slices/answers.slice";
import { IGetFullQizRequest, ISOlvedQuiz } from "../../features/slices/quiz.slice";

export const postApiCreateQuiz = async (payload: any) => {
  try {
    const resp = await axios.post(`${API_URL}/quiz/create-new`, payload)
    return resp;
  }
  catch (err) {
    throw err;
  }
}
export const getApiQuizzes = async () => {
  try {
    const resp = await axios.get(`${API_URL}/quiz`)
    return resp;
  }
  catch (err) {
    throw err;
  }
}
export const getApiFilteredQuizzes = async (payload: IFilter) => {
  try {
    const resp = await axios.post(`${API_URL}quiz/filter`, payload)
    return resp;
  }
  catch (err) {
    throw err;
  }
}
export const getApiQuiz = async (payload: IGetFullQizRequest) => {
  try {
    const resp = await axios.post(`${API_URL}/quiz/getQuiz`, payload)
    return resp;
  }
  catch (err) {
    throw err;
  }
}
export const vote = async (payload: ISOlvedQuiz) => {
  try {
    const resp = await axios.post(`${API_URL}/quiz/vote-quiz`, payload)
    return resp;
  }
  catch (err) {
    throw err;
  }
}

