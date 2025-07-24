import React from "react";
import type { Operation } from "../types";
import { useNavigate } from "react-router";
import useOperation from "../hooks/useOperation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import IconType from "./IconType";

const OperationListItem = ({ operation }: { operation: Operation }) => {
  const { dispatch } = useOperation();
  const navigate = useNavigate();
  const deleteOperation = (
    id: Operation["idOperation"],
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch({ type: "delete-operation", payload: { id } });
  };

  const handleIdOperationDetails = (
   
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    // dispatch({ type: "change-idOperation", payload: { idOperation: id } });
    navigate(`/operation-detail/${operation.idOperation}`);
  };

  return (
    <div
      className="px-2 py-2 rounded-xl grid grid-cols-8 grid-rows-1 gap-1 justify-items-center items-center max-w-4xl mx-auto    bg-gray-100 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in"
      onClick={(e) => handleIdOperationDetails( e)}
    >
      {operation.mode === "buy" ? (
        <ArrowRightIcon className="w-8 h-8 md:w-10 md:h-10  text-red-600  " />
      ) : (
        <ArrowLeftIcon className="md:w-10 md:h-10  text-green-600 " />
      )}

      <div className="flex flex-col gap-1 md:gap-4 col-span-4 md:col-span-3 px-0.5 md:px-0  md:flex-row items-center ">
        <IconType type={operation.type} />
        <p
          className={` text-center 
                      ${operation.mode === "buy" ? "font-bold" : "font-medium"}
                      `}
        >
          {operation.name}
        </p>
      </div>

      <p className={operation.mode === "buy" ? "font-bold" : "font-medium"}>
        {operation.quantity}{" "}
        <span className="capitalize">{operation.measure}</span>
      </p>

      <div className="grid grid-rows-2 gap-2 flex-none   md:grid-cols-2 md:col-span-2  md:flex md:items-center md:justify-evenly ">
        <p>
          <span className="text-red-700 font-medium">B</span> $
          <span>{operation.buy}</span>
        </p>

        <p>
          <span className="text-green-700 font-medium">S</span> $
          <span>{operation.sale}</span>
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => deleteOperation(operation.idOperation, e)}
      >
        <XCircleIcon className="w-10 h-10 md:w-12 md:h-12  text-red-700 hover:text-red-800 hover-scale-105" />
      </button>
    </div>
  );
};

export default OperationListItem;
