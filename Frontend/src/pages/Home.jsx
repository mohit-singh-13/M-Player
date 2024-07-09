import { useContext, useEffect } from "react";
import { fetchSongs } from "../utils/fetchData";
import { AppContext } from "../context/AppContext";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import authenticate from "../utils/authenticate";
import { toast } from "react-toastify";

const Home = () => {

    const {allSongs, setAllSongs, spinner, setSpinner, term, setLogin, navigate} = useContext(AppContext);
    
    const fetchData = async (term) => {
        setSpinner(true);
        
        const response = await fetchSongs(term);
        setAllSongs(response.results);
        
        setSpinner(false);
    }

    useEffect(() => {
        async function authentication() {
            const response = await authenticate();

            if (response.success) {
                setLogin(true);
                fetchData(term);
            } else {
                setLogin(false);
                navigate("/login");
            }
        }

        authentication();
    }, [term])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div>
            {
                spinner ? 
                <Spinner /> : 
                <Cards allSongs={allSongs} />
            }
            </div>
        </div>
    )
}

export default Home