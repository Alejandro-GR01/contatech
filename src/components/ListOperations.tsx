import useOperation from "../hooks/useOperation";
import OperationListItem from "./OperationListItem";
import { useMemo, type ReactNode } from "react";

const ListOperations = ({
  filter,
  children,
}: {
  filter?: string | undefined;
  children?: ReactNode;
}) => {
  const { state } = useOperation();


  const operationToShow = useMemo(() => {
    if (!filter) return state.operationAll;
    else if (filter === "buy") return state.operationBuy;
    else if (filter === "sale") return state.operationSale;
    else return state.operationAll.filter(oper => oper.idProduct === filter) ;
  }, [filter, state]);
  return (
    <div className="mx-auto px-4 md:px-8 min-h-screen  pt-10 pb-4 md:pt-20 md:pb-8 space-y-3  md:text-xl md:font-medium   bg-slate-700 ">
      {operationToShow?.length > 0 ? (
        <>
          <h3 className="listOperation-title">{`List Operations ${
            !filter ? "" : filter === "buy" ? "Buy" : filter === "sale" ?"Sale" : ''
          }  `}</h3>
          {operationToShow.map((oper) => (
            <OperationListItem operation={oper} key={oper.idOperation} />
          ))}
        </>
      ) : (
        <h3 className="listOperation-title">
          {` No operations ${
            !filter ? "" : filter === "buy" ? "buy" : filter === "sale" && "sale"
          }   added yet! Insert one. `}
        </h3>
      )}
      {children}
    </div>
  );
};

export default ListOperations;
