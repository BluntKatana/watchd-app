import { create } from "apisauce";
import tmdb from "../config/tmdb";

const apiClient = create({
  baseURL: tmdb.base_url,
});

export default apiClient;
