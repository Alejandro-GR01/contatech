import { useMemo } from "react";
import useOperation from "../hooks/useOperation";
import type { Operation } from "../types";
import IconType from "../components/IconType";

type OperationDetail = Operation & {
  quantityRest?: number;
};

const CardDetail = ({ operation }: { operation: OperationDetail }) => {
  return (
    <>
      <div className="flex flex-col gap-6 md:gap-12">
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div className=" md:col-span-2">
            <div className=" md:p-8">
              <IconType
                type={operation.type}
                classStyles=" w-20! h-20! md:w-28! md:h-28!"
              />
            </div>
            <p className="text-xl md:text-3xl font-semibold md:text-center ">
              {operation.name}
            </p>
          </div>
          <div className="flex flex-col  py-1 md:items-center justify-evenly ">
            <p
              className={`capitalize ${
                operation.mode === "buy" ? "text-red-700" : "text-green-700"
              } text-xl md:text-2xl font-semibold opacity-80 `}
            >
              {operation.mode}
            </p>
            <p className="font-bold text-base md:text-lg text-blue-900">
              {operation.quantity}
            </p>
            {operation.quantityRest && (
              <p className="font-bold text-base md:text-lg text-green-900">
                {operation.quantityRest}
              </p>
            )}
          </div>
        </div>
        <div>
 
        <p className="text-xs text-blue-900 font-bold">
          <span className="text-black text-sm  ">ProductId : </span>
          {operation.idProduct}
        </p>
        <p className="text-xs  text-blue-900 font-bold">
          <span className="text-black text-sm  ">OperationId : </span>
          {operation.idOperation}
        </p>
        </div>
      </div>
    </>
  );
};

const OperationDetail = () => {
  const { state} = useOperation();

  //HAy que quitar el id de producto detail

  const operationToShow = state.operationAll.filter(
    (oper) => oper.idOperation === state.idOperationDetail
  )[0];

  const operationShowBuy = useMemo(() => {
    if (operationToShow.mode === "buy") {
      return state.operationBuy.filter(
        (oper) => oper.idOperation === state.idOperationDetail
      )[0];
    }
  }, [operationToShow, state])!;

  console.log(operationToShow);

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className=" max-w-full md:max-w-3xl bg-white shadow-2xl rounded-2xl p-12 mx-4 ">
        {operationShowBuy ? (
          <CardDetail operation={operationShowBuy} />
        ) : (
          <CardDetail operation={operationToShow} />
        )}
      </div>
    </div>
  );
};

export default OperationDetail;
