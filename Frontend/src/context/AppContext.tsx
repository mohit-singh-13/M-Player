import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";

interface AppContextType {
  navigate: NavigateFunction;
  allSongs: Song[];
  setAllSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  spinner: boolean;
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  song: Song;
  setSong: React.Dispatch<React.SetStateAction<Song>>;
}

export type Song = {
  previewUrl: string;
  trackCensoredName: string;
  artistName: string;
  artworkUrl100: string;
};

export const AppContext = createContext<AppContextType>({
  navigate: () => {},
  allSongs: [],
  setAllSongs: () => {},
  spinner: true,
  setSpinner: () => {},
  term: "Latest Songs",
  setTerm: () => {},
  login: false,
  setLogin: () => {},
  song: {
    previewUrl: "",
    trackCensoredName: "",
    artistName: "",
    artworkUrl100: "",
  },
  setSong: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [spinner, setSpinner] = useState(true);
  const [term, setTerm] = useState("Latest Songs");
  const [login, setLogin] = useState(false);
  const [song, setSong] = useState<Song>({
    previewUrl: "",
    trackCensoredName: "",
    artistName: "",
    artworkUrl100: "",
  });

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
    setSong,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
