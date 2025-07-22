import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid"
import { useNavigate } from "react-router"


const ButtonNavBefore = () => {
  const navigate = useNavigate()
  return (
    <div className=" fixed  bottom-8 right-8  md:bottom-12 md:right-12 z-40  hover:right-10   md:hover:right-16  hover:scale-105 transition-all duration-200 ease-in " >

    <button type="button"
      onClick={()=> navigate(-1)}
    >
        <ArrowLeftCircleIcon className="text-blue-900 bg-white rounded-full  w-12 h-12 md:w-14 md:h-14 " />
        </button>
    </div>
  )
}

export default ButtonNavBefore