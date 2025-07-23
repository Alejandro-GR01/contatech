import { Link } from "react-router";
import FormProduct from "../components/FormProduct";
import useOperation from "../hooks/useOperation";
import ListOperations from "../components/ListOperations";
import ButtonGeneric from "../components/ButtonGeneric";
import NavOperationList from "../components/NavOperationList";

const UseItLayout = () => {
  const { userName } = useOperation();
  return (
    <>
      {userName === "" ? (
        <div className=" h-screen   w-screen  mx-auto flex justify-center items-center ">

          <div className="py-50 md:py-40 ">
            <Link to={"/login"}>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 text-center text-shadow-lg hover:scale-105 transition-all duration-500 ease-in-out">
                Please login or make a count for use it!
              </h3>
            </Link>
          </div>
        </div>
     
      ) : (
        <div>
          <FormProduct />
          <div className="flex items-center justify-center pb-12 md:py-14 md:hidden ">
            <Link to={"operation-list"}>
              <ButtonGeneric title="List Operations" />
            </Link>
          </div >
          <div className="hidden md:block">

          <ListOperations >
            <NavOperationList />
            </ListOperations>
          </div>
        </div>
      )}
    </>
  );
};

export default UseItLayout;
