import axios from "./axios";


export async function get(url, params = {}, headers = {}) {
  try {
    const response = await axios.get(url, {
      params: params,
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
export async function patch(url, data = {}, headers = {}) {
  try {
    const response = await axios.patch(url, data, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error making PATCH request:", error.message);
    throw error;
  }
}