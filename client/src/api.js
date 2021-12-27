import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const getData = async (boardId) => {
  try {
    const cards = await instance.get(`/${boardId}`);
    return cards;
  } catch (err) {
    console.error(err);
  }
};

const sendData = (boardId, cards) => {
  instance.post(`/${boardId}`, cards);
};

export { getData, sendData };
