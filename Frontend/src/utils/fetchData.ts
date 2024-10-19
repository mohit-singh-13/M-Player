import axios from "axios";
import { json } from "react-router-dom";
import { Song } from "../context/AppContext";

export const fetchSongs = async (term: string) => {
  try {
    const baseUrl = import.meta.env.VITE_SONG_API;
    const URL = `${baseUrl}&term=${term}`;

    const response = (await axios.get(URL, {
      withCredentials: true,
    })) as Axios.AxiosXHR<{ results: Song[] }>;

    return response.data;
  } catch (err) {
    return json({
      success: false,
      message: "Something went wrong",
      error: (err as Error).message,
    });
  }
};

export const fetchData = async (
  formData: {
    name: string;
    email: string;
    password: string;
    cpass: string;
  },
  btn: string
) => {
  try {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const URL = `${baseUrl}/${btn}`;

    const response = await axios.post(URL, formData, {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    return json({
      success: false,
      message: "Something went wrong",
      error: (err as Error).message,
    });
  }
};
