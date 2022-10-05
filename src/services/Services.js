import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import { SIGN_UP_URL, SEARCH_POST_URL } from "./Constants/http";

export const getMovies = async () => {
  const response = await axiosInstance.get(`/shows/movies`);
  return response.data;
};

export const getRecommend = async (page) => {
  const response = await axiosInstance.get(`/shows/recommended/?page=${page}`);
  return response.data;
};

export const getShows = async () => {
  const response = await axiosInstance.get(`/shows/tv`);
  return response.data;
};

export const getTrending = async () => {
  const response = await axiosInstance.get(`/shows/trending/`);
  return response.data;
};

export const getBookmark = async () => {
  const response = await axiosInstance.get("/bookmarks/my");
  return response.data;
};

export const postBookmark = async (data) => {
  const response = await axiosInstance.post(`/bookmarks/my`, data);
  console.log(response.data);
  return response.data;
};

export const deleteBookmark = async (id) => {
  const response = await axiosInstance.delete(`/bookmarks/my/${id}`);
  console.log(response.data);
  return response.data;
};

export const SignUpUser = async (data) => {
  const response = await axios.post(SIGN_UP_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
};

export const SearchService = async (data) => {
  try {
    const response = await axios.post(SEARCH_POST_URL, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};
