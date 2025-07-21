import ButtonGeneric from "./ButtonGeneric";
import { useContext, useState, type ChangeEvent } from "react";
import Mesage from "./Mesage";
import { OperationContext } from "../context/OperationContext";
import { Link, useNavigate } from "react-router";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

 function RegisterLogin () {
  const navigate = useNavigate();

  const context = useContext(OperationContext);

  const mesage = context.mesage;
  const showMesage = context.showMesage;

  const setUserName = context.setUserName;

  const [isLoging, setIsLogin] = useState(false);

  const [user, setUser] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };
  const handlePassword1 = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword1(e.target.value);
  };
  const handlePassword2 = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const validationFormUser = () => {
    if (isLoging === true) {
      if (user.length < 6) {
        showMesage("Username must be over 6 letters.", "error");
      } else if (password1.length < 8) {
        showMesage("Password must be over 8 characters.", "error");
      } else if (password1 !== password2) {
        showMesage("Passwords must be equals!", "error");
      } else {
        showMesage("User added correctly.", "success");
        setTimeout(() => {
            navigate(-1);
          setUserName(user);
        }, 3000);
      }
    } else {
      if (user.length < 6) {
        showMesage("Username must be over 6 letters.", "error");
      } else if (password1.length < 8) {
        showMesage("Password must be over 8 characters.", "error");
      } else {
        showMesage("You are registred correctly.", "success");
        setTimeout(() => {
          setUserName(user);
          navigate(-1);
        }, 3000);
      }
    }
  };

  return (
    <>
      <div className="relative  overflow-hidden  mx-auto px-2  flex items-center min-h-screen">
        <div className="z-10 relative max-w-xl my-20 mx-auto  py-4   md:mx-auto  border border-gray-300 rounded-lg shadow-xl  login-gradient">
          <div className=" flex   gap-4 justify-between items-center  mx-auto ">
            <div className="flex items-center px-4 py-4  mr-8 ">
              <img
                src="/ct-logo.png"
                alt="ContaTech"
                className="w-24 h-24 md:w-28 md:h-28 p-2"
              />
              <p className="font-sans text-2xl md:text-4xl text-green-700 font-bold">
                Conta<span className="text-blue-700">Tech</span>
              </p>
            </div>
            <Link to="/" className="mx-8 md:mx-10">
              <ArrowRightEndOnRectangleIcon className="text-green-700 w-8 h-8 md:w-10 md:h-10 hover:text-shadow-xs text-shadow-green-700  hover-scale-105" />
            </Link>
          </div>
          <h2 className="text-2xl text-blue-700  text-shadow-2xs font-bold text-center">
            {isLoging ? "Login" : "Register"}
          </h2>

          <form className="px-4 md:px-10 pt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="user"
                className="md:text-lg font-medium pl-1 text-blue-900"
              >
                Username :
              </label>
              <input
                type="text"
                id="user"
                placeholder="username"
                className="bg-white border border-gray-200 p-1 rounded "
                value={user}
                onChange={(e) => handleUserName(e)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password1"
                className="md:text-lg font-medium pl-1 text-blue-900"
              >
                Password :
              </label>
              <input
                type="password"
                id="password1"
                placeholder="password"
                className="bg-white border border-gray-200 p-1 rounded "
                value={password1}
                onChange={handlePassword1}
              />
            </div>
            {isLoging && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password2"
                  className="md:text-lg font-medium pl-1 text-blue-900"
                >
                  Repeat Password :
                </label>
                <input
                  type="password"
                  id="password2"
                  placeholder="repeat password"
                  className="bg-white border border-gray-200 p-1 rounded "
                  value={password2}
                  onChange={handlePassword2}
                />
              </div>
            )}

            <div className="flex mt-6 gap-4 justify-evenly">
              <ButtonGeneric
                title={isLoging ? "Login" : "Register"}
                handleButon={() => {
                  validationFormUser();
                }}
              />
              <ButtonGeneric
                title="Reset"
                handleButon={() => {
                  console.log("reset");
                }}
              />
            </div>

            <Mesage text={mesage[0]} type={mesage[1]} />

            <div className="py-2">
              {isLoging ? (
                <p className="text-sm cursor-default">
                  If you have an acount please{" "}
                  <span
                    className="text-blue-700 cursor-pointer  "
                    onClick={() => setIsLogin(false)}
                  >
                    Register
                  </span>
                </p>
              ) : (
                <p className="text-sm cursor-default">
                  If you don't have an acount please{" "}
                  <span
                    className="text-blue-700 cursor-pointer "
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>

        <img
          src="/bg-contable.jpg"
          alt="imagen-Bg"
          className="absolute left-0 h-full min-w-screen md:w-full md:h-full opacity-60 "
        />
      </div>
    </>
  );
};

export default RegisterLogin;
