import {
  createContext,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  initialState,
  operationReducer,
  type Actions,
  type State,
} from "../reducers/operation-reducer";
import type { MesageProps } from "../components/Mesage";

type OperationContextProps = {
  state: State;
  dispatch: React.ActionDispatch<[actions: Actions]>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  mesage: [string, "error" | "success"];
  showMesage: (text: MesageProps["text"], type: MesageProps["type"]) => void;
  budgetRest: number;
  benefit: number;
};

export const OperationContext = createContext<OperationContextProps>(null!);

type OperationProviderProps = {
  children: ReactNode;
};

export const OperationProvider = ({ children }: OperationProviderProps) => {
  const [state, dispatch] = useReducer(operationReducer, initialState);
  const [userName, setUserName] = useState("");
  const [mesage, setMesage] = useState<
    [MesageProps["text"], MesageProps["type"]]
  >(["", "error"]);

  const showMesage = (text: MesageProps["text"], type: MesageProps["type"]) => {
    setMesage([text, type]);

    setTimeout(() => {
      setMesage(["", "error"]);
    }, 3000);
  };

  const budgetRest = useMemo(()=> state.budget - state.operationBuy.reduce((budgetMinus, buyOper)=> {
     return buyOper.buy * buyOper.quantity + budgetMinus}, 0), [state.budget, state.operationBuy])

     const benefit = useMemo(()=> state.operationSale.reduce((totalbenefit, saleOper)=> saleOper.sale * saleOper.quantity + totalbenefit, 0) ,[state.operationSale])

  return (
    <OperationContext.Provider
      value={{
        state,
        dispatch,
        userName,
        setUserName,
        mesage,
        showMesage,
        budgetRest,
        benefit


      }}
    >
      {children}
    </OperationContext.Provider>
  );
};
