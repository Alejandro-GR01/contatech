import { useMemo } from "react";
import useOperation from "../hooks/useOperation";
import CardDetail from "../components/CardDetail";





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
      <div className=" max-w-full md:max-w-3xl bg-white shadow-2xl rounded-2xl px-12 pt-12 pb-6 md:pb-8 mx-4 ">
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
