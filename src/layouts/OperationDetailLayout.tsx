import { useEffect, useMemo } from "react";
import useOperation from "../hooks/useOperation";
import CardDetail from "../components/CardDetail";
import { useNavigate, useParams } from "react-router";

const OperationDetailLayout = () => {
  const { state } = useOperation();
  const {idOperation} = useParams()


  const navigate = useNavigate();



  
  const operationToShow = useMemo(() => {
    if (state.operationAll.length > 0) {
      return state.operationAll.filter(
        (oper) => oper.idOperation === idOperation
      )[0];
    }
  }, [state, idOperation]);
  
  const operationShowBuy = useMemo(() => {
    if (operationToShow?.mode === "buy") {
      return state.operationBuy.filter(
        (oper) => oper.idOperation === idOperation
      )[0];
    }
  }, [state, operationToShow, idOperation]);
  
  
  useEffect(()=> {
    if(!idOperation ) navigate('/') 
  }, [idOperation])

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

export default OperationDetailLayout;
