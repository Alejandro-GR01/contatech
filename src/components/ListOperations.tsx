import { useContext } from "react";
import { OperationContext } from "../context/OperationContext";
import { ArrowRightCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import type { Operation } from "../types";

const ListOperations = () => {
  const context = useContext(OperationContext);

  const deleteOperation = (id: Operation["idOperation"]) => {
    context.dispatch({ type: "delete-operation", payload: { id } });
  };

  return (
    <div className="mx-auto px-4   py-10 md:py-20 space-y-3  md:text-xl md:font-medium   bg-slate-700">
      {context.state.operationAll.length > 0 ? (
        <>
          <h3 className="listOperation-title">
           List Operations 
          </h3>
          {context.state.operationAll.map((oper) => (
            <div
              key={oper.idOperation}
              className="px-3 py-2 rounded-xl grid grid-cols-7 items-center max-w-4xl mx-auto    bg-gray-100 shadow-lg"
            >
              <div className="flex items-center gap-2 md:gap-4 col-span-3 md:pl-9">
                <ArrowRightCircleIcon
                  className={`w-8 h-8 md:w-12 md:h-12 ${
                    oper.mode === "buy" ? " text-red-600" : " text-green-600"
                  } `}
                />
                <p className="capitalize">{oper.name}</p>
              </div>

              <p>
                {oper.quantity}{" "}
                <span className="capitalize">{oper.measure}</span>
              </p>
              <p>
                <span className="text-red-700 font-light">B</span> $
                <span>{oper.buy}</span>
              </p>
              <p>
                <span className="text-green-700 font-light">S</span> $
                <span>{oper.sale}</span>
              </p>
              <button
                type="button"
                onClick={() => deleteOperation(oper.idOperation)}
                className="pl-19"
              >
                <XCircleIcon className="w-8 h-8 md:w-12 md:h-12 text-red-700 hover:text-red-800 hover-scale-105" />
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
