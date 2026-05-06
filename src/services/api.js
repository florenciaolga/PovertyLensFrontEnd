import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const fetchMapData = () => API.get("/map");
export const fetchRegion = (name) => API.get(`/region?name=${name}`);
export const searchRegion = (q) => API.get(`/search?q=${q}`);