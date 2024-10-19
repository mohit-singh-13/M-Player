import songImg from "../assets/header.jpg";
import musicImg from "../assets/music.png";

const PlayerHeader = ({
  songName,
  spin,
}: {
  songName: string;
  spin: boolean | null;
}) => {
  let spinnerMusic = "";

  if (spin) {
    spinnerMusic = "spinnerMusic";
  } else {
    spin = null;
  }

  return (
    <div>
      <div className="relative">
        <img src={songImg} alt="Header image" />
        <img
          src={musicImg}
          alt="Music image"
          className={`w-[33%] absolute top-[22%] left-[33%] ${spinnerMusic}`}
        />
      </div>

      <p className="text-center text-[1.5rem] py-2 underline font-customFont tracking-wider">
        {songName}
      </p>
    </div>
  );
};

export default PlayerHeader;

// top-[4.5rem] left-[11.8rem]
