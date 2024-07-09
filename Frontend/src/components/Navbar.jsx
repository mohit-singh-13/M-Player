import { useContext, useRef } from "react";
import logo from "../assets/logo.png"
import { CiSearch } from "react-icons/ci";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Navbar = () => {

    const {setTerm} = useContext(AppContext);
    
    const searchData = useRef();

    const keyDownHandler = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            setTerm(searchData.current.value);
            navigate("/")
        }
    }
    
    const clickHandler = async() => {
        setTerm(searchData.current.value);
        navigate("/")
    }

    const {setLogin, navigate} = useContext(AppContext);

    const logoutHandler = async() => {
        try {
            const URL = import.meta.env.VITE_LOGOUT_URL;

            const response = await axios(URL, {
                withCredentials: true
            });

            if (response) {
                toast.success("You're logged out successfully", {
                    theme: "dark"
                })

                setLogin(false);
                navigate("/login");
            }

        } catch(err) {
            toast.error("Please try after some time", {
                theme: "dark"
            })
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between py-2 px-[4rem] max-xl:flex-col shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-customFont">
                <div className="w-[300px] max-xs:w-[75%]" onClick={() => {
                    document.getElementById('search').value = ''
                    setTerm("Latest Songs");
                    navigate("/");
                }}>
                    <img src={logo} alt="logo" className="cursor-pointer w-full mx-auto" />
                </div>

                <div className="relative max-xl:w-full max-xl:flex">
                    <div className="relative max-xl:w-[80%] mx-auto">
                        <input 
                        type="text" 
                        id="search" 
                        placeholder="Search Tracks and Artists"
                        onKeyDown={keyDownHandler}
                        ref={searchData}
                        className="border border-black w-[750px] rounded-full px-4 py-4 placeholder:text-black placeholder:font-semibold focus:outline-[#005D6C] max-xl:px-2 max-xl:py-2 max-xl:w-full max-xl:mx-auto placeholder:italic" />

                        <div 
                        
                        className="absolute top-3 right-5 cursor-pointer hover:text-[#005D6C] max-xl:top-1">
                            <CiSearch className="" size="2rem" onClick={clickHandler} />
                        </div>
                    </div>
                </div>

                <div className="max-xl:w-full max-xl:flex max-xl:justify-center max-xl:mt-2">
                    <button className="font-semibold text-[1.5rem] bg-[#005D6C] hover:bg-[#005e6c9a] text-[#ffffff] rounded-full px-3 py-[0.7rem] transition duration-200 max-xl:w-[80%] max-xl:py-2" onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar

// 03073E