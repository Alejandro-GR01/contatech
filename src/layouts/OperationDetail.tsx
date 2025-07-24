import { useEffect, useMemo } from "react";
import useOperation from "../hooks/useOperation";
import CardDetail from "../components/CardDetail";
import { useNavigate, useParams } from "react-router";

const OperationDetail = () => {
  const { state } = useOperation();
  const {idOperation} = useParams()

  const navigate = useNavigate();

  //HAy que quitar el id de producto detail

  
  const operationToShow = useMemo(() => {
    if (state.operationAll.length > 0) {
      return state.operationAll.filter(
        (oper) => oper.idOperation === state.idOperationDetail
      )[0];
    }
  }, [state.operationAll, state.idOperationDetail]);
  
  const operationShowBuy = useMemo(() => {
    if (operationToShow?.mode === "buy") {
      return state.operationBuy.filter(
        (oper) => oper.idOperation === state.idOperationDetail
      )[0];
    }
  }, [operationToShow, state]);
  
  useEffect(()=> {
    if(!operationToShow ) navigate('/') 
  }, [operationToShow])

  return (
    <>
    {operationToShow && (

    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className=" max-w-full md:max-w-3xl bg-white shadow-2xl rounded-2xl px-12 pt-12 pb-6 md:pb-8 mx-4 ">
        {operationShowBuy ? (
          <CardDetail operation={operationShowBuy} />
        ) : (
          <CardDetail operation={operationToShow} />
        )}
      </div>
    </div>
    )}
    </>
  );
};

export default OperationDetail;
