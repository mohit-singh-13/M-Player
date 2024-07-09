import { useContext } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";


const Card = ({song}) => {
    // console.log(song);
    const {setSong, navigate} = useContext(AppContext);

    let trackName = song?.trackCensoredName;

    if (trackName.length > 14) {
        trackName = trackName.substr(0, 13) + "..."
        trackName = trackName.toLowerCase();
    }

    let artistName = song?.artistName;

    if (artistName.length > 20) {
        artistName = trackName.substr(0, 20) + "..."
    }
    const thumbnail = song?.artworkUrl100;

    return (
        <div className="w-[220px] flex flex-col gap-5">
            <div className="w-full overflow-hidden">
                <img src={thumbnail} alt="thumbnail" className="w-full hover:scale-110 transition duration-200" />
            </div>

            <div className="flex justify-between gap-3">
                <div className="w-[60%]">
                    <p className="text-[15px] font-bold capitalize font-customFont">{trackName}</p>
                    <p className="text-[13px] font-customFont">{artistName}</p>
                </div>

                <div className="relative w-[40%] flex flex-col justify-center hover:text-white transition-all duration-100 group"
                onClick={() => {
                    setSong(song);
                    navigate("/player");
                }}>
                    <div className="absolute left-2 top-[0.9rem]">
                        <FaRegCirclePlay fontSize="0.8rem" />
                    </div>

                    <button className="border-2 border-black rounded-xl px-3 pl-7 text-[15px] font-bold group-hover:bg-[#005D6C] group-hover:border-[#005D6C] group-hover:text-white transition font-customFont">Play</button>
                </div>
            </div>
        </div>
    )
}

export default Card