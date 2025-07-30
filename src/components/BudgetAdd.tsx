import { useState } from "react";
import useOperation from "../hooks/useOperation";
import { useNavigate } from "react-router";


const BudgetAdd = () => {
    const {dispatch} = useOperation()
    const navigate = useNavigate()

  const [newBudget, setNewBudget] = useState(0);
  return (
        <div className="max-w-3xl min-h-50 mx-auto my-12 rounded-2xl  py-8 px-6 bg-gray-200 border-2  border-gray-300 shadow-2xl ">
       <form className="flex flex-col px-4 py-2 "
       onSubmit={(e) =>{
        e.preventDefault()
                         dispatch({
                           type: "add-budget",
                           payload: { budget: newBudget },
                         })
                         navigate('/use')

                     }
                     }>
                   <label
                     htmlFor="budget"
                     className="text-3xl text-center font-bold text-blue-600 text-shadow-xs  shadow-blue-600 py-8"
                   >
                     Budget :{" "}
                   </label>
   
                   <input
                     className="w-lg border-2 border-blue-600 mx-auto p-1 px-4 rounded bg-white"
                     type="number"
                     name="budget"
                     id="budget"
                     placeholder="budget"
                     value={newBudget}
                     onChange={(e) => setNewBudget(+e.target.value)}
                   />
   
                   <input
                     type="submit"
                     value={"Add"}
                     className="w-md my-8 text-2xl font-bold text-white mx-auto px-2 py-1
                    bg-blue-600 hover:scale-105 transition-all duration-500 ease-in-out disabled:opacity-75 hover:disabled:scale-100"
                     disabled={newBudget <= 0}
                     
                   />
                 </form>
                 </div>
  )
}

export default BudgetAdd