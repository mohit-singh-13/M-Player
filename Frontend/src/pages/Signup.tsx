import { useContext, useEffect } from "react";
import Form from "../components/Form";
import { AppContext } from "../context/AppContext";
import logo from "../assets/logo.png";
import authenticate from "../utils/authenticate";

const Signup = () => {
  const { navigate, setLogin } = useContext(AppContext);

  useEffect(() => {
    async function authentication() {
      const response = (await authenticate()) as { success: boolean };

      if (response.success) {
        setLogin(true);
        navigate("/");
      } else {
        setLogin(false);
        return;
      }
    }

    authentication();
  }, [navigate, setLogin]);

  return (
    <div className="max-md:flex max-md:flex-col max-md:gap-8 font-customFont font-semibold">
      <div>
        <img
          src={logo}
          alt="logo"
          className="mx-auto w-[30%] max-md:w-[50%] mt-2"
        />
      </div>

      <div>
        <Form btn="signup" />
      </div>

      <div className="text-center mt-5 text-[1.3rem] w-10/12 mx-auto">
        <p>
          If you already have an account you can{" "}
          <span
            className="text-blue-700 font-semibold cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login here!
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
