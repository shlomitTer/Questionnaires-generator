import axios from "axios";
import { API_URL } from "../../app/constants";
import { IFilter } from "../../features/slices/answers.slice";

export const getApiQuestions = async () => {
  try {

    const resp = await axios.get(`${API_URL}question`)

    return resp;
  }
  catch (err) {
    throw err;
  }
}
export const postAddQuestion = async (payload: any) => {
  try {
    const resp = await axios.post(`${API_URL}/question/create-New`, payload)

    return resp;
  }
  catch (err) {
    throw err;
  }
}
export const getApiFilteredQuestions = async (payload: IFilter) => {
  try {
    const resp = await axios.post(`${API_URL}/question/filter`, payload)
    return resp;
  }
  catch (err) {
    throw err;
  }
}