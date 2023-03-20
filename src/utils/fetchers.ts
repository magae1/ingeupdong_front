import axios from "axios";

export const mainFetcher = (url: string) =>
  axios
    .get(`/api${url}`)
    .then((res) => {
      return res.data;
    })
    .catch();
