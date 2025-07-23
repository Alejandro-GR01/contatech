export type Operation ={
    mode: string,
    type: string,
    name: string,
    quantity: number,
    measure: string,
    buy: number,
    sale: number,
    idOperation: string,
    idProduct : string,
    user: string
    date: number
}

export type OperationBuy = Operation &{
    quantityRest: number
}

export type OperationDetail = Operation & {
  quantityRest?: number;
};