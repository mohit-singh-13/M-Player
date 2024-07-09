import Navbar from "../components/Navbar";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { MdForward5 } from "react-icons/md";
import { MdOutlineReplay5 } from "react-icons/md";
import { FaVolumeUp } from "react-icons/fa";
import { IoVolumeMute } from "react-icons/io5";
import PlayerHeader from "../components/PlayerHeader";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Player = () => {

    const {navigate, song, login} = useContext(AppContext);

    const songUrl = song?.previewUrl;
    const songName = song?.trackCensoredName;

    const [spin, setSpin] = useState(false);

    useEffect(() => {
        if (!login) {
            navigate("/login");
        }
    }, [])
    
    return (
        <div>
            <div className="flex flex-col gap-3 font-customFont">
                <div>
                    <Navbar />
                </div>

                <button className="px-4 py-2 bg-[#03073E] rounded-lg w-[5rem] mx-auto text-center font-bold text-white"
                onClick={() => {
                    navigate(-1);
                }}>Back</button>

                <div className="w-[80%] mx-auto md:w-[40%]">
                    <AudioPlayer 
                        src={songUrl}

                        showFilledVolume={true}

                        header={<PlayerHeader songName={songName} spin={spin} />}
                        
                        customIcons={{
                            play: <FaPlay color="#ffffff" />,
                            pause: <FaPause color="#ffffff" />,
                            rewind: <MdOutlineReplay5 color="#ffffff" />,
                            forward: <MdForward5 color="#ffffff" />,
                            volume: <FaVolumeUp color="#ffffff" />,
                            volumeMute: <IoVolumeMute color="#ffffff" />
                        }}

                        className="bg-[#005D6C] rounded-xl p-5 text-white"

                        onPlay={() => {
                            setSpin(true);
                        }}

                        onPause={() => {
                            setSpin(false);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Player