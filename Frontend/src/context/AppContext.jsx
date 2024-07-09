import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    
    const navigate = useNavigate(null);
    const [allSongs, setAllSongs] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [term, setTerm] = useState("Latest Songs");
    const [login, setLogin] = useState(false);
    const [song, setSong] = useState({});

    const value = {
        navigate,
        allSongs,
        setAllSongs,
        spinner,
        setSpinner,
        term,
        setTerm,
        login,
        setLogin,
        song,
        setSong
    }
    
    return <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
}

export default AppContextProvider