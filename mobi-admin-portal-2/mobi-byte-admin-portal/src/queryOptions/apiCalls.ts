import axios from "axios";

const baseURL = "http://localhost:3000";

export const loginUser = async () => {
  const response = await axios.get(`${baseURL}/login`);
  console.log(response.data);
  return response.data;
};
