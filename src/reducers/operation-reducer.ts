import type { Operation, OperationBuy } from "../types";

export type State = {
  operationBuy: OperationBuy[];
  operationSale: Operation[];
  operationAll: Operation[];
};

export type Actions =
  | { type: "add-buyOperation"; payload: { operation: OperationBuy } }
  | { type: "add-saleOperation"; payload: { operation: Operation } }
  | { type: "delete-operation"; payload: { id: Operation["idOperation"] } };

export const initialState: State = {
  operationBuy: [],
  operationSale: [],
  operationAll: [],
};

export const operationReducer = (
  state: State = initialState,
  actions: Actions
) => {
  if (actions.type === "add-buyOperation") {
    const  {
      mode,
      type,
      name,
      quantity,
      measure,
      buy,
      sale,
      idOperation,
      idProduct,
      date,
    } = actions.payload.operation;
    const operationToAll = {
      mode,
      type,
      name,
      quantity,
      measure,
      buy,
      sale,
      idOperation,
      idProduct,
      date,
    };
    return {
      ...state,
      operationBuy: [...state.operationBuy, actions.payload.operation],
      operationAll: [...state.operationAll, operationToAll],
    };
  }
  if (actions.type === "add-saleOperation") {
    const BuyProdCopy = [...state.operationBuy]
    const findBuyProdIndex = state.operationBuy.findIndex(operation => operation.idProduct === actions.payload.operation.idProduct)
    const newBuyArray = BuyProdCopy.map((prod, i)=> {
      if(i === findBuyProdIndex){
        const newRest = prod.quantityRest - actions.payload.operation.quantity
        return {
          ...prod,
          quantityRest : newRest
        }
      } else {
      return prod
      }
    })

   
    
    
        return {
          ...state,
          operationBuy: newBuyArray,
          operationSale: [...state.operationSale, actions.payload.operation],
          operationAll: [...state.operationAll, actions.payload.operation],

        };


  }
  if (actions.type === "delete-operation") {
    const operationToDelete = state.operationAll.find(
      (operation) => operation.idOperation === actions.payload.id
    );
    if (operationToDelete) {
      let buyResolt: OperationBuy[] = [...state.operationBuy];
      let saleResolt: Operation[] = [...state.operationSale];
      let allResolt: Operation[] = [];
      if (operationToDelete.mode === "buy") {
        buyResolt = state.operationBuy.filter(
          (operation) => operation.idOperation !== actions.payload.id
        );
      } else if (operationToDelete.mode === "sale") {
        saleResolt = state.operationSale.filter(
          (operation) => operation.idOperation !== actions.payload.id
        );
      }

      allResolt = state.operationAll.filter(
        (operation) => operation.idOperation !== actions.payload.id
      );

      return {
        ...state,
        operationBuy: buyResolt,
        operationSale: saleResolt,
        operationAll: allResolt,
      };
    }
  }
  return state;
};
