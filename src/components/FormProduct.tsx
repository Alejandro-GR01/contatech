import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  measureProduct,
  modeProduct,
  typeProduct,
  type OptionItem,
} from "../data/db";
import ButtonGeneric from "./ButtonGeneric";
import Mesage from "./Mesage";
import { v4 as uuidv4 } from "uuid";
import type { Operation, OperationBuy } from "../types";
import useOperation from "../hooks/useOperation";

type SelectitemProps = {
  name: string;
  optionList: OptionItem[];
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void   
  value: string;
  disabled?: boolean;
};



type LabelInputProps = {
  name: string;
  labelName: string;
  value: number | string;
  type: string
  handleInput:  (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void   
  disabled?: boolean;
};

type SelectNameProps = {
  operationBuy: OperationBuy[];
  handleData:Dispatch<SetStateAction<OperationForm>>;
  type: string;
  name: string;
   setQuantityRest: Dispatch<SetStateAction<number>>
};

type OperationForm = Omit<Operation, "idOperation" | "date">;

const SelectItem = ({
  name,
  optionList,
  handleSelect,
  value,
  disabled,
}: SelectitemProps) => {
  return (
    <select
      name={name}
      id={name}
      value={value}
      onChange={handleSelect}
      className={`${
        disabled ? "opacity-80 text-gray-500 " : ""
      } text-lg font-semibold bg-gray-300 rounded-lg px-2 py-2 block ${value === 'buy' ? 'text-red-800' : value === 'sale' && ' text-green-800'}   `}
      disabled={disabled}
    >
      {optionList.map((item) => (
        <option
          disabled={item.disabled}
          key={item.id}
          value={item.value}
          className={`${item.value === 'buy' ? 'text-red-700' : item.value === 'sale' && ' text-green-700'} disabled:bg-gray-400 disabled:text-gray-600 `}
        >
          {item.name}{" "}
        </option>
      ))}
    </select>
  );
};



const LabelInput= ({
  name,
  labelName,
  value,
  type,
  handleInput,
  disabled,
}: LabelInputProps) => {
  return (
    <div className="grid grid-rows-1 grid-cols-7 justify-center   items-center ">
      <label htmlFor={name} className="px-2 text-lg  font-semibold col-span-3 ">
        {labelName}
      </label>
      <input
        disabled={disabled}
        type={type}
        name={name}
        id={name}
        placeholder={labelName}
        value={value}
        onChange={handleInput}
        
        className={`${
          disabled ? "opacity-80 " : ""
        } placeholder:lowercase  bg-gray-300 rounded-lg px-4 py-2 col-span-4 `}
      />
    </div>
  );
};

const NotProductAvilable = () => {
  return (
    <label className="text-red-700 bg-red-200 border-2 rounded-lg border-red-700 text-lg font-semibold  px-2 flex items-center  ">
      No products avilable to sale .
    </label>
  );
};

const SelectName = ({
  operationBuy,
  handleData,
  type,
  name,
  setQuantityRest
}: SelectNameProps) => {

  const operationBuyAvilable = useMemo(()=> operationBuy.filter(oper => oper.quantityRest > 0) , [operationBuy] ) 
  const filterType = useMemo(()=> operationBuyAvilable.filter(
    (operation) => operation.type === type
  ) ,[type, operationBuyAvilable] ) ;

  const operationBuySelected = (name: string) => {
    const buyFind = operationBuyAvilable.find((operation) => operation.name === name);
    if (buyFind) {
      setQuantityRest(buyFind.quantityRest)
      console.log(buyFind.quantityRest)

      /// Para cambiar si es sale y que solo se muestren los valores del sale seleccionado
      handleData((data) => {
        return{
          ...data,
          name:buyFind.name,
          buy: buyFind.buy,
          measure: buyFind.measure,
          sale: buyFind.sale,
          type: buyFind.type,
          idProduct: buyFind.idProduct

        }
      })
      
    }
  };

  const operationsToSale = useMemo(()=>
    {
      if(operationBuyAvilable.length === 0 ){
        return []
      } else if (type === 'DEFAULT'){
        return operationBuyAvilable
      } else if (filterType.length > 0 ){
        return filterType
      } else {
        return []
      }

    } , [operationBuyAvilable, type  ])

  return (
    <>
      {operationsToSale.length === 0 ? (
        <NotProductAvilable />
      ) : (
        <select
          name="name"
          id="name"
          value={name}
          onChange={(e) => {
            operationBuySelected(e.target.value);
          }}
          className="text-lg font-semibold bg-gray-300 rounded-lg px-2 py-2 "
        >
          <option
            disabled={true}
            value=""
            className="bg-gray-400 text-gray-600"
          >
            Select a product
          </option>
          {operationsToSale.map((operation) => (
            <option key={operation.name} value={operation.name}>
              {operation.name}
            </option>
          ))}
        </select>
      )
    } 
    </>
  );
};

const FormProduct = () => {
  const {
    mesage,
    showMesage,
    dispatch,
    state: { operationBuy },
    userName,
  } = useOperation();

  const initialForm = {
    mode: "DEFAULT",
    type: "DEFAULT",
    name: "",
    quantity: 0,
    measure: "DEFAULT",
    buy: 0,
    sale: 0,
    idProduct: "",
    user: ''
  }

  const [operationForm, setOperationForm] = useState<OperationForm>(initialForm);
  const [quantityRest, setQuantityRest] = useState(0)



  const resetFormProd = () => {
    setOperationForm(initialForm)
  };

  const validationFormProduct = () => {
    if (operationForm.mode === "DEFAULT") {
      showMesage("Please insert a Operation Mode.", "error");
    } else if (operationForm.mode === "sale" && operationBuy.length === 0) {
      showMesage("Please insert first a buy operation", "error");
    } else if (operationForm.type === "DEFAULT") {
      showMesage("Please insert a Operation Type.", "error");
    } else if (operationForm.name.length === 0) {
      showMesage("The name is necessary.", "error");
    } else if (operationForm.name.length < 6) {
      showMesage("The name must be over 6 letters.", "error");
    } else if (operationForm.quantity <= 0) {
      showMesage("Please insert a quantity valid.", "error");
    } else if (operationForm.measure === "DEFAULT") {
      showMesage("Please insert a Operation Measure", "error");
    } else if (operationForm.buy <= 0) {
      showMesage("Please insert a Operation Buy valid", "error");
    } else if (operationForm.sale <= 0) {
      showMesage("Please insert a Operation Sale valid", "error");
    } else {
      showMesage("Operation add", "success");

      let operationPayload;
     

      if (operationForm.mode === "buy") {
        operationPayload = {
         ...operationForm,
          idOperation: uuidv4(),
          idProduct: uuidv4(),
          date: Date.now(),
          quantityRest: operationForm.quantity,
          user: userName
        };
        resetFormProd();
        dispatch({
          type: "add-buyOperation",
          payload: {
            operation: operationPayload,
          },
        });
      } else if (operationForm.mode === "sale") {
        if(operationForm.quantity > quantityRest){
        
          showMesage(`Please insert a quantity sale valid the ${operationForm.name} only have ${quantityRest}${operationForm.measure}`, 'error')
          setOperationForm({
            ...operationForm,
            quantity: 0
          })
          return
        } else {

          operationPayload = {
            ...operationForm,
            idOperation: uuidv4(),
            idProduct: operationForm.idProduct,
            date: Date.now(),
            user: userName
          };
          resetFormProd();
  
          dispatch({
            type: "add-saleOperation",
            payload: {
              operation: operationPayload,
            },
          });
        }
      }
       
    }
  };

  const isSale = () => {
    return operationForm.mode === "sale";
  };

 

  const handleLabelSelect = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> )=> e.target.name === 'mode' || e.target.name === 'type' || e.target.name === 'name' || e.target.name === 'measure' ? (
    setOperationForm({
      ...operationForm,
      [e.target.name] : e.target.value

      })
  ) : (
       setOperationForm({
      ...operationForm,
      [e.target.name] : +e.target.value
    })
  )



  return (
    <>
      {userName !== "" && (
        <div className=" p-2 md:px-6 ">
          <div className="max-w-3xl min-h-50 mx-auto my-12 rounded-2xl  py-8 px-6 bg-gray-200 border-2  border-gray-300 shadow-2xl">
            <h2 className="text-3xl text-center font-bold text-blue-600 text-shadow-xs  shadow-blue-600 py-8">
              Operations:
            </h2>
            <form className="flex flex-col px-4 py-2">
              <div className="grid grid-cols-1  md:grid-cols-2 md:grid-rows-4 gap-x-5  gap-y-6  ">
                <SelectItem
                  name="mode"
                  optionList={modeProduct}
                  handleSelect={handleLabelSelect}
                  value={operationForm.mode}
                />

                <SelectItem
                  name="type"
                  optionList={typeProduct}
                  handleSelect={handleLabelSelect}
                  value={operationForm.type}
                />

                {operationForm.mode === "buy" || operationForm.mode === "DEFAULT" ? (
                  <LabelInput
                    name="name"
                    type='string'
                    value={operationForm.name}
                    labelName={"Product-name"}
                    handleInput={handleLabelSelect}
                  />
                ) : (
                  
                  <SelectName
                    operationBuy={operationBuy}
                    handleData={setOperationForm}
                    type={operationForm.type}
                    name={operationForm.name}
                    setQuantityRest = {setQuantityRest}
                  />
                )}

                <LabelInput
                  name="quantity"
                  labelName="Quantity"
                  type="number"
                  value={operationForm.quantity}
                  handleInput={handleLabelSelect}
                />

                <SelectItem
                  name="measure"
                  optionList={measureProduct}
                  handleSelect={handleLabelSelect}
                  value={operationForm.measure}
                  disabled={isSale()}
                />

                <LabelInput
                  name="buy"
                  labelName="Buy-Price"
                  type="number"
                  value={operationForm.buy}
                  handleInput={handleLabelSelect}
                  disabled={isSale()}
                />
                <LabelInput
                  name="sale"
                  labelName="Sale-Price"
                  type="number"
                  value={operationForm.sale}
                  handleInput={handleLabelSelect}
                  disabled={isSale()}
                />
              </div>
              <Mesage text={mesage[0]} type={mesage[1]} />
              <div className=" flex justify-evenly gap-x-5 pt-8 ">
                <ButtonGeneric
                  title="Add operation"
                  handleButon={validationFormProduct}
                />
                
                <ButtonGeneric title="Reset" handleButon={resetFormProd} />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormProduct;
