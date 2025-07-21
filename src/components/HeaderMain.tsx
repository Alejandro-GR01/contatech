import { ArrowRightEndOnRectangleIcon, UserIcon } from "@heroicons/react/24/outline"
import ButtonGeneric from "./ButtonGeneric"
import { Link } from "react-router"
import useOperation from "../hooks/useOperation"




const HeaderMain = () => {
    const {userName, setUserName} = useOperation()
    return (
        <header className=" header-home ">
            <div className="flex justify-between items-center gap-8 max-w-6xl mx-auto  ">

                <div className="flex items-center h-32 md:h-64    px-4 py-1 md:px-6 md:py-2 ">
                    <img
                        src="/ct-logo.png"
                        alt="ContaTech"
                        className="w-24 h-24 md:w-28 md:h-28 p-2 " />
                    <p className="font-sans text-2xl md:text-4xl text-blue-700 font-bold">Conta<span className="text-green-700 text-shadow-xs">Tech</span></p>
                </div>
                <div className="mx-8 md:mx-10">
                    {userName === '' ? (

                        <Link to='/login'>

                            <ButtonGeneric title="Register" />
                        </Link>

                    ) : (
                        <div className="flex flex-col md:flex-row gap-1 md:gap-8 items-center justify-between">
                            <div className="flex flex-col justify-center items-center  p-2  hover-scale-105">
                                <UserIcon   className="text-blue-700  w-10 h-10 md:w-16 md:h-16 hover:text-shadow-xs text-shadow-blue-700   " />
                                <p className="text-sm md:text-base font-medium  text-white capitalize">{userName}  </p>
                            </div>
                            <ArrowRightEndOnRectangleIcon className="text-blue-700 w-8 h-8 md:w-12 md:h-12 hover:text-shadow-xs text-shadow-blue-700  hover-scale-105 "
                                onClick={() => setUserName('')} />
                        </div>
                    )
                    }
                </div>
            </div>
        </header>
    )
}

export default HeaderMain