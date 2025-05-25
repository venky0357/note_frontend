import axios from "axios";

const baseUrl = "https://note-backend-g518.onrender.com/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (note) => {
  const response = await axios.post(baseUrl, note);
  return response.data;
};

const update = async (id, note) => {
  const response = await axios.put(`${baseUrl}/${id}`, note);
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
