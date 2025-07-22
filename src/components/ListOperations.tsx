import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import type { Operation } from "../types";
import useOperation from "../hooks/useOperation";
import { useNavigate } from "react-router";
import IconType from "./IconType";



const ListOperations = () => {
  const { state, dispatch } = useOperation();
  const navigate = useNavigate();

  const deleteOperation = (id: Operation["idOperation"]) => {
    dispatch({ type: "delete-operation", payload: { id } });
  };

  const handleIdOperationDetails = (id: Operation["idOperation"]) => {
    dispatch({ type: "change-idOperation", payload: { idOperation: id } });
    navigate("/operation-detail");
  };

  return (
    <div className="mx-auto px-4   py-10 md:py-20 space-y-3  md:text-xl md:font-medium   bg-slate-700">
      {state.operationAll.length > 0 ? (
        <>
          <h3 className="listOperation-title">List Operations</h3>
          {state.operationAll.map((oper) => (
            <div
              key={oper.idOperation}
              className="px-2 py-2 rounded-xl grid grid-cols-8 grid-rows-1 gap-1 items-center max-w-4xl mx-auto    bg-gray-100 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in"
              onClick={() => handleIdOperationDetails(oper.idOperation)}
            >
                <div className="">
                  
                {oper.mode === "buy" ? (
                  <ArrowRightCircleIcon className="w-10 h-10 md:w-12 md:h-12 text-red-600  " />
                ) : (
                  <ArrowLeftCircleIcon className="w-10 h-10 md:w-12 md:h-12 text-green-600 " />
                )}
                </div>
                <div className="flex flex-col gap-1 md:gap-4 col-span-4 md:col-span-3 px-0.5 md:px-0  md:flex-row items-center ">
                  <IconType type={oper.type} />
                  <p
                    className={` text-center 
                      ${oper.mode === "buy" ? "font-bold" : "font-medium"  }
                      `
                    }
                  >
                    {oper.name}
                  </p>
                </div>
              

              <p className={oper.mode === "buy" ? "font-bold" : "font-medium"}>
                {oper.quantity}{" "}
                <span className="capitalize">{oper.measure}</span>
              </p>

              <div className="grid grid-rows-2 gap-2 flex-none   md:grid-cols-2 md:col-span-2  md:flex md:items-center md:justify-evenly ">
                <p>
                  <span className="text-red-700 font-medium">B</span> $
                  <span>{oper.buy}</span>
                </p>

                <p>
                  <span className="text-green-700 font-medium">S</span> $
                  <span>{oper.sale}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => deleteOperation(oper.idOperation)}
                
              >
                <XCircleIcon className="w-10 h-10 md:w-12 md:h-12  text-red-700 hover:text-red-800 hover-scale-105" />
              </button>
            </div>
          ))}
        </>
      ) : (
        <h3 className="listOperation-title">
          No operation added yet! Insert one.{" "}
        </h3>
      )}
    </div>
  );
};

export default ListOperations;
