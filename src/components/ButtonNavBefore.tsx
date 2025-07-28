import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid"
import { useNavigate } from "react-router"


const ButtonNavBefore = () => {
  const navigate = useNavigate()
  return (
    <div className=" fixed  bottom-8 right-8  md:bottom-12 md:right-12 z-40  hover:right-10   md:hover:right-16  hover:scale-105 transition-all duration-500 ease-in " >

    <button type="button"
      onClick={()=> navigate(-1)}
    >
      <div className="relative  cursor-pointer">
        <ArrowLeftCircleIcon className="text-blue-900 relative rounded-full z-20  w-12 h-12 md:w-14 md:h-14 " />    
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full z-10"></div>    
      </div>
        
        </button>
    </div>
  )
}

export default ButtonNavBefore