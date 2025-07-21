import { useContext } from "react"
import { OperationContext } from "../context/OperationContext"


const useOperation = () => {
  const context = useContext(OperationContext)

  return context
}

export default useOperation