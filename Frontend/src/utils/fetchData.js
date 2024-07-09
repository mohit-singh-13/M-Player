import axios from "axios";
import { json } from "react-router-dom";

export const fetchSongs = async(term) => {
    try {
        const baseUrl = import.meta.env.VITE_SONG_API;
        const URL = `${baseUrl}&term=${term}`;

        const response = await axios.get(URL, {
            withCredentials: true
        });

        return response?.data;

    } catch(err) {
        return json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const fetchData = async(formData, btn) => {
    try {
        const baseUrl = import.meta.env.VITE_BASE_URL;

        const URL = `${baseUrl}/${btn}`
        
        const response = await axios.post(URL, formData ,{
            withCredentials: true
        })

        return response.data;

    } catch(err) {
        return json({
            success: false,
            message: "Something went wrong"
        })
    }
}