import axios from "axios";
import { json } from "react-router-dom"

const authenticate = async() => {
    try {
        const URL = import.meta.env.VITE_AUTHENTICATE_URL;

        const response = await axios.get(URL, {
            withCredentials: true
        })

        return response.data;

    } catch(err) {
        return json({
            success: false
        })
    }
}

export default authenticate