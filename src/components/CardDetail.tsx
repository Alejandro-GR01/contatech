import type { OperationDetail } from "../types";
import IconType from "./IconType";
import { UserIcon } from "@heroicons/react/24/solid";

const CardDetail = ({ operation }: { operation: OperationDetail }) => {
  return (
    <>
      <div className="flex flex-col gap-8 md:gap-24">
        <div className="grid grid-cols-2 justify-items-stretch items-end gap-16">
          <div className=" grid ">
            <div className=" md:px-8 md:py-2 mx-auto">
              <IconType
                type={operation.type}
                classStyles=" w-24! h-24! md:w-28! md:h-28!"
              />
            </div>
            <p className="text-xl md:text-3xl font-semibold md:text-center ">
              {operation.name}
            </p>
          </div>
          <div className="flex flex-col gap-4 md:gap-8  py-1 md:items-center justify-evenly ">
            <p
              className={`capitalize ${
                operation.mode === "buy" ? "text-red-800" : "text-green-800"
              } text-xl md:text-2xl font-semibold opacity-90 `}
            >
              {operation.mode}
            </p>
            <p className="font-bold text-base md:text-lg text-blue-900">
              {operation.quantity}  {operation.measure}{" "}
              <span className="text-gray-700 font-medium">
                {operation.mode}
              </span>
            </p>
            {operation.quantityRest && (
              <p className="block font-bold text-base md:text-lg text-green-900">
                {operation.quantityRest} {operation.measure}{" "}
                <span className="text-gray-700 font-medium">rest</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-black text-sm  ">
            {" "}
            ProductId :{""}
            <span className=" text-xs text-blue-900 hover:underline hover:cursor-default  ">
              {" "}
              {operation.idProduct}{" "}
            </span>
          </p>
          <p className=" text-black text-sm font-bold  ">
            OperationId :{""}
            <span className="text-xs text-blue-900 hover:underline hover:cursor-default">
              {" "}
              {operation.idOperation}{" "}
            </span>
          </p>
          <div className="flex gap-1 ">
            <div>
              <UserIcon title={operation.user} className="h-4 w-4 text-black" />
            </div>

            <p className="font-bold text-xs text-blue-900 hover:underline hover:cursor-default">
              {" "}
              {operation.user}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
