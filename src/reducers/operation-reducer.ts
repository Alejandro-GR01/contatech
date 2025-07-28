import type { Operation, OperationBuy } from "../types";

export type State = {
  operationBuy: OperationBuy[];
  operationSale: Operation[];
  operationAll: Operation[];
  budget: number;
  budgetRest: number;
  benefit: number;
};

export type Actions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "add-buyOperation"; payload: { operation: OperationBuy } }
  | { type: "add-saleOperation"; payload: { operation: Operation } }
  | { type: "delete-operation"; payload: { id: Operation["idOperation"] } };

const initialStorage = (): State => {
  const localStorageOperations = localStorage.getItem("operations");
  return localStorageOperations
    ? JSON.parse(localStorageOperations)
    : initialOperDefault;
};

const initialOperDefault = {
  operationBuy: [],
  operationSale: [],
  operationAll: [],
  budget: 0,
  budgetRest: 0,
  benefit: 0,
};

export const initialState: State = initialStorage();

export const operationReducer = (
  state: State = initialState,
  actions: Actions
) => {
  if (actions.type === "add-budget") {
    const budgetAdd = state.budget + actions.payload.budget;
    const budgetRestAdd = state.budgetRest + actions.payload.budget;
    return {
      ...state,
      budget: budgetAdd,
      budgetRest: budgetRestAdd,
    };
  }

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
      user,
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
      user,
    };
    const budgetRestNew = state.budgetRest - buy * quantity;
    return {
      ...state,
      operationBuy: [...state.operationBuy, actions.payload.operation],
      operationAll: [...state.operationAll, operationToAll],
      budgetRest: budgetRestNew,
    };
  }
  // ////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  /// Hay que variar la inversion en dependencia de las compras que ya estan encima y si se elimina alguna ademas de aumentar las ganancias de un state caja chica cuando se hagan ventas
  //////////////////////////////////////
  if (actions.type === "add-saleOperation") {
    const BuyProdCopy = [...state.operationBuy];
    const findBuyProdIndex = state.operationBuy.findIndex(
      (operation) => operation.idProduct === actions.payload.operation.idProduct
    );
    const newBenefit =
      state.benefit +
      actions.payload.operation.quantity * actions.payload.operation.sale;
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
      benefit: newBenefit,
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
      let newBudgetRest = state.budgetRest;
      let newBenefit = state.benefit;
      let benefitMinus= 0 

      if (operationToDelete.mode === "buy") {
        newBudgetRest =
          state.budgetRest + operationToDelete.buy * operationToDelete.quantity;
        const indexBuyToDelete = state.operationBuy.findIndex(
          (oper) => oper.idOperation === actions.payload.id
        );
        idProductToDelete = state.operationBuy[indexBuyToDelete].idProduct;

        buyRes = state.operationBuy.filter(
          (operation) => operation.idOperation !== actions.payload.id
        );

        state.operationSale
          .filter((oper) => oper.idProduct === idProductToDelete)
          .map((oper) => (benefitMinus += oper.quantity * oper.sale));

          newBenefit = state.benefit - benefitMinus

        saleRes = state.operationSale.filter(
          (oper) => oper.idProduct !== idProductToDelete
        );
        allRes = state.operationAll.filter(
          (oper) => oper.idProduct !== idProductToDelete
        );
      } else if (operationToDelete.mode === "sale") {
        newBenefit =
          state.benefit - operationToDelete.sale * operationToDelete.quantity;
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
        budgetRest: newBudgetRest,
        benefit: newBenefit,
      };
    }
  }

  return state;
};
