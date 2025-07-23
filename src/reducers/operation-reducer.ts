import type { Operation, OperationBuy } from "../types";

export type State = {
  operationBuy: OperationBuy[];
  operationSale: Operation[];
  operationAll: Operation[];
  idOperationDetail : Operation['idOperation']
};

export type Actions =
  | { type: "add-buyOperation"; payload: { operation: OperationBuy } }
  | { type: "add-saleOperation"; payload: { operation: Operation } }
  | { type: "delete-operation"; payload: { id: Operation["idOperation"] } }
  |{type:'change-idOperation'; payload: {idOperation : Operation['idOperation']}}

export const initialState: State = {
  operationBuy: [],
  operationSale: [],
  operationAll: [],
  idOperationDetail: ''
};

export const operationReducer = (
  state: State = initialState,
  actions: Actions
) => {
  if (actions.type === "add-buyOperation") {
    const {
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
      user
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
      user
    };
    return {
      ...state,
      operationBuy: [...state.operationBuy, actions.payload.operation],
      operationAll: [...state.operationAll, operationToAll],
    };
  }
  if (actions.type === "add-saleOperation") {
    const BuyProdCopy = [...state.operationBuy];
    const findBuyProdIndex = state.operationBuy.findIndex(
      (operation) => operation.idProduct === actions.payload.operation.idProduct
    );
    const newBuyArray = BuyProdCopy.map((prod, i) => {
      if (i === findBuyProdIndex) {
        const newRest = prod.quantityRest - actions.payload.operation.quantity;
        return {
          ...prod,
          quantityRest: newRest,
        };
      } else {
        return prod;
      }
    });

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
      let buyRes: OperationBuy[] = [...state.operationBuy];
      let saleRes: Operation[] = [];
      let allRes: Operation[] = [];
      let idProductToDelete: OperationBuy["idProduct"];

      if (operationToDelete.mode === "buy") {
        const indexBuyToDelete = state.operationBuy.findIndex(
          (oper) => oper.idOperation === actions.payload.id
        );
        idProductToDelete = state.operationBuy[indexBuyToDelete].idProduct;
        buyRes = state.operationBuy.filter(
          (operation) => operation.idOperation !== actions.payload.id
        );
        saleRes = state.operationSale.filter(
          (oper) => oper.idProduct !== idProductToDelete
        );
        allRes = state.operationAll.filter(
          (oper) => oper.idProduct !== idProductToDelete
        );
      } else if (operationToDelete.mode === "sale") {
        const indexSaleDelete = state.operationSale.findIndex(
          (oper) => oper.idOperation === actions.payload.id
        );
        idProductToDelete = state.operationSale[indexSaleDelete].idProduct;
        saleRes = state.operationSale.filter(
          (operation) => operation.idOperation !== actions.payload.id
        );
        allRes = state.operationAll.filter(
          (operation) => operation.idOperation !== actions.payload.id
        );
        buyRes = state.operationBuy.map((oper) => {
          if (oper.idProduct === idProductToDelete) {
            return {
              ...oper,
              quantityRest:
                oper.quantityRest +
                state.operationSale[indexSaleDelete].quantity,
            };
          } else {
            return oper;
          }
        });
      }

      return {
        ...state,
        operationBuy: buyRes,
        operationSale: saleRes,
        operationAll: allRes,
      };
    }
  }
  if(actions.type === 'change-idOperation'){
    return{
      ...state,
      idOperationDetail : actions.payload.idOperation
    }
  }
  return state;
};
