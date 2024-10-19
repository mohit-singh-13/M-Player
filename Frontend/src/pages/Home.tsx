import { useCallback, useContext, useEffect } from "react";
import { fetchSongs } from "../utils/fetchData";
import { AppContext, Song } from "../context/AppContext";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import authenticate from "../utils/authenticate";

const Home = () => {
  const {
    allSongs,
    setAllSongs,
    spinner,
    setSpinner,
    term,
    setLogin,
    navigate,
  } = useContext(AppContext);

  const fetchData = useCallback(
    async (term: string) => {
      setSpinner(true);

      const response = (await fetchSongs(term)) as { results: Song[] };
      setAllSongs(response.results);

      setSpinner(false);
    },
    [setAllSongs, setSpinner]
  );

  useEffect(() => {
    async function authentication() {
      type Res = {
        success: boolean;
        results: object[];
      };

      const response = (await authenticate()) as Res;

      if (response.success) {
        setLogin(true);
        fetchData(term);
      } else {
        setLogin(false);
        navigate("/login");
      }
    }

    authentication();
  }, [term, navigate, setLogin, fetchData]);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>{spinner ? <Spinner /> : <Cards allSongs={allSongs} />}</div>
    </div>
  );
};

export default Home;
