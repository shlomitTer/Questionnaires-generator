import axios from "axios";
import { API_URL } from "../../app/constants";

export const getApiTypes = async () => {
  try {
    const resp = await axios.get(`${API_URL}/type`)
    return resp;
  }
  catch (err) {
    throw err;
  }
}

