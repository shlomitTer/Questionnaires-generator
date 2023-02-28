import axios from "axios";
import { API_URL } from "../../app/constants";
import { IFilter, IInputVote } from "../../features/slices/answers.slice";

export const getApiAnswers = async (id: string) => {
  try {
    const resp = await axios.get(`${API_URL}/answer/${id}`)
    return resp;
  }
  catch (err) {
    throw err;
  }
}

export const getApiFilteredAnswers = async (payload: IFilter) => {
  try {
    const resp = await axios.post(`${API_URL}/answer/filter`, payload)
    return resp;
  }
  catch (err) {
    throw err;
  }
}
export const apiVote = async (payload: IInputVote) => {
  try {
    const resp = await axios.post(`${API_URL}/answer/vote`, payload)
    return resp;
  }
  catch (err) {

    throw err;
  }
}

