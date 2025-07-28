import { useParams } from "react-router"
import ListOperations from "../components/ListOperations"
import useOperation from "../hooks/useOperation"


const ProductListLayout = () => {
    const {idProduct} = useParams()
    const {state: {operationBuy}} = useOperation()
    
  return (
    <ListOperations filter={idProduct}>
        <p className="text-gray-300 text-xl font-medium">Quantity Rest : {operationBuy.filter(oper=> oper.idProduct === idProduct)[0].quantityRest}</p>
        </ListOperations>

  )
}

export default ProductListLayout