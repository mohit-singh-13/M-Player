import { useContext, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { fetchData } from "../utils/fetchData.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext.tsx";

const Form = ({ btn }: { btn: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpass: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const showPassHandler = () => {
    setShowPass(!showPass);
  };

  const showConPassHandler = () => {
    setShowConPass(!showConPass);
  };

  const { setLogin, navigate } = useContext(AppContext);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitFormHandler();
    }
  };

  const submitFormHandler = async () => {
    if (btn === "signup") {
      if (
        formData.name == "" ||
        formData.email == "" ||
        formData.password == "" ||
        formData.cpass == ""
      ) {
        toast.error("Please fill all the details", {
          theme: "dark",
        });
        return;
      }

      if (formData.password !== formData.cpass) {
        toast.error("Passwords must be same", {
          theme: "dark",
        });
        return;
      }
    }

    const response = (await fetchData(formData, btn)) as {
      success: boolean;
      message: string;
    };

    if (btn === "login" && response.success) {
      setLogin(true);

      navigate("/");

      toast.success(response.message, {
        theme: "dark",
      });
    } else if (btn === "login") {
      toast.error(response.message, {
        theme: "dark",
      });
    }

    if (btn === "signup" && response.success) {
      toast.success(response.message, {
        theme: "dark",
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        cpass: "",
      });
    } else if (btn === "signup") {
      toast.error(response.message, {
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <div className="max-w-[70%] mx-auto flex flex-col gap-7 mt-8">
        {btn === "signup" && (
          <div>
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={changeHandler}
              onKeyDown={keyDownHandler}
              className="border border-black w-full py-4 rounded-md px-4 placeholder:text-[1.2rem] focus:outline-[#005D6C] placeholder:italic"
            />
          </div>
        )}

        <div>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            className="border border-black w-full py-4 rounded-md px-4 placeholder:text-[1.2rem] focus:outline-[#005D6C] placeholder:italic"
          />
        </div>

        <div>
          <div className="relative">
            <input
              required
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={changeHandler}
              onKeyDown={keyDownHandler}
              className="border border-black w-full py-4 rounded-md px-4 placeholder:text-[1.2rem] focus:outline-[#005D6C] placeholder:italic"
            />

            <div
              className="absolute right-5 top-4 cursor-pointer"
              onClick={showPassHandler}
            >
              {showPass ? (
                <IoEye fontSize="1.6rem" />
              ) : (
                <IoEyeOff fontSize="1.6rem" />
              )}
            </div>
          </div>
        </div>

        {btn === "signup" && (
          <div>
            <div className="relative">
              <input
                required
                type={showConPass ? "text" : "password"}
                name="cpass"
                id="cpass"
                placeholder="Confirm Password"
                value={formData.cpass}
                onChange={changeHandler}
                onKeyDown={keyDownHandler}
                className="border border-black w-full py-4 rounded-md px-4 placeholder:text-[1.2rem] focus:outline-[#005D6C] placeholder:italic"
              />

              <div
                className="absolute right-5 top-4 cursor-pointer"
                onClick={showConPassHandler}
              >
                {showConPass ? (
                  <IoEye fontSize="1.6rem" />
                ) : (
                  <IoEyeOff fontSize="1.6rem" />
                )}
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            className="bg-[#005D6C] w-full rounded-md py-1 text-[2rem] font-bold text-white tracking-[0.5rem] uppercase"
            onClick={submitFormHandler}
          >
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
