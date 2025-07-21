import { Link } from "react-router";
import FormProduct from "../components/FormProduct";
import useOperation from "../hooks/useOperation";
import ListOperations from "../components/ListOperations";

const UseItLayout = () => {
  const { userName } = useOperation();
  return (
    <div>
      {userName === "" ? (
        <div className="max-w-4xl mx-auto  ">
          <div className="py-50 md:py-40 ">
            <Link to={"/login"}>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 text-center text-shadow-lg hover:scale-105 transition-all duration-500 ease-in-out">
                Please login or make a count for use it!
              </h3>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <FormProduct />
          <ListOperations />
        </>
      )}
    </div>
  );
};

export default UseItLayout;
