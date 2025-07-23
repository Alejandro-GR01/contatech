import useOperation from "../hooks/useOperation";
import OperationListItem from "./OperationListItem";
import { useMemo, type ReactNode } from "react";

const ListOperations = ({
  mode,
  children,
}: {
  mode?: string | undefined;
  children?: ReactNode;
}) => {
  const { state } = useOperation();

  console.log(mode);
  const operationToShow = useMemo(() => {
    if (!mode) return state.operationAll;
    else if (mode === "buy") return state.operationBuy;
    else if (mode === "sale") return state.operationSale;
    else return [];
  }, [mode, state]);
  return (
    <div className="mx-auto px-4   pt-10 pb-4 md:pt-20 md:pb-8 space-y-3  md:text-xl md:font-medium   bg-slate-700">
      {operationToShow?.length > 0 ? (
        <>
          <h3 className="listOperation-title">{`List Operations ${
            !mode ? "" : mode === "buy" ? "Buy" : mode === "sale" && "Sale"
          }  `}</h3>
          {operationToShow.map((oper) => (
            <OperationListItem operation={oper} key={oper.idOperation} />
          ))}
        </>
      ) : (
        <h3 className="listOperation-title">
          {` No operations ${
            !mode ? "" : mode === "buy" ? "buy" : mode === "sale" && "sale"
          }   added yet! Insert one. `}
        </h3>
      )}
      {children}
    </div>
  );
};

export default ListOperations;
