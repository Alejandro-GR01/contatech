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
    date: number
}

export type OperationBuy = Operation &{
    quantityRest: number
}