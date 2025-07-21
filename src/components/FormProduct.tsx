import { useState, type Dispatch, type SetStateAction } from "react";
import {
  measureProduct,
  modeProduct,
  typeProduct,
  type OptionItem,
} from "../data/db";
import ButtonGeneric from "./ButtonGeneric";
import Mesage from "./Mesage";
import { v4 as uuidv4 } from "uuid";
import type { Operation } from "../types";
import useOperation from "../hooks/useOperation";

type SelectitemProps = {
  name: string;
  optionList: OptionItem[];
  handleSelect: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  disabled?: boolean;
};

type LabelInputStringProps = {
  name: string;
  labelName: string;
  value: string
  handleInput: Dispatch<SetStateAction<string>>;
};

type LabelInputNumberProps = {
  name: string;
  labelName: string;
  value: number,
  handleInput: Dispatch<SetStateAction<number>>;
  disabled?: boolean;
};

type SelectNameProps = {
  operationBuy: Operation[];
  handleData: {
    setName: Dispatch<SetStateAction<string>>;
    setBuy: Dispatch<SetStateAction<number>>;
    setMeasure: Dispatch<SetStateAction<string>>;
    setSale: Dispatch<SetStateAction<number>>;
    setType: Dispatch<SetStateAction<string>>;
    setIdProduct: Dispatch<SetStateAction<string>>
  };
  type: string;
  name: string;
};

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
      onChange={(e) => {
        handleSelect(e.target.value);
      }}
      className={`${
        disabled ? "opacity-80 text-gray-500 " : ""
      }text-lg font-semibold bg-gray-300 rounded-lg px-2 py-0 block `}
      disabled={disabled}
    >
      {optionList.map((item) => (
        <option
          disabled={item.disabled}
          key={item.id}
          value={item.value}
          className="disabled:bg-gray-400 disabled:text-gray-600"
        >
          {item.name}{" "}
        </option>
      ))}
    </select>
  );
};

const LabelInputString = ({
  name,
  labelName,
  value,
  handleInput,
}: LabelInputStringProps) => {
  return (
    <div className=" grid grid-rows-1 grid-cols-5   justify-between items-center ">
      <label htmlFor={name} className="px-2 text-lg  font-semibold col-span-2 ">
        {labelName}
      </label>
      <input
        name={name}
        id={name}
        placeholder={labelName}
        value={value}
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        className=" placeholder:lowercase  bg-gray-300 rounded-lg px-4 py-2 col-span-3"
      />
    </div>
  );
};

const LabelInputNumber = ({
  name,
  labelName,
  value,
  handleInput,
  disabled,
  
}: LabelInputNumberProps) => {
  return (
    <div className="grid grid-rows-1 grid-cols-7 justify-center   items-center ">
      <label htmlFor={name} className="px-2 text-lg  font-semibold col-span-3 ">
        {labelName} 
      </label>
      <input
        disabled={disabled}
        type="number"
        name={name}
        id={name}
        placeholder={labelName}
        value={value}
        onChange={(e) => {
          handleInput(+e.target.value);
        }}
        className={`${
          disabled ? "opacity-80 " : ""
        } placeholder:lowercase  bg-gray-300 rounded-lg px-4 py-2 col-span-4 `}
      />
    </div>
  );
};

const NotProductYet = () => {
  return (
    <label className="text-red-700 bg-red-200 border-2 rounded-lg border-red-700 text-lg font-semibold  px-2 flex items-center  ">
      No products yet!
    </label>
  );
};

const SelectName = ({
  operationBuy,
  handleData,
  type,
  name,
}: SelectNameProps) => {
  const filterType = operationBuy.filter(
    (operation) => operation.type === type
  );

  const operationBuySelected = (name: string) => {
    const buyFind = operationBuy.find((operation) => operation.name === name);
    if (buyFind) {
      handleData.setName(buyFind.name);
      handleData.setBuy(buyFind.buy);
      handleData.setMeasure(buyFind.measure);
      handleData.setSale(buyFind.sale);
      handleData.setType(buyFind.type);
      handleData.setIdProduct(buyFind.idProduct)
      
    }
  };

  return (
    <>
      {operationBuy.length <= 0 ? (
        <NotProductYet />
      ) : type === "DEFAULT" ? (
        <select
          name="name"
          id="name"
          value={name}
          onChange={(e) => {
            operationBuySelected(e.target.value);
          }}
          className="text-lg font-semibold bg-gray-300 rounded-lg px-2 "
        >
          <option
            disabled={true}
            value=""
            className="bg-gray-400 text-gray-600"
          >
            Select a product
          </option>
          {operationBuy.map((operation) => (
            <option key={operation.name} value={operation.name}>
              {operation.name}
            </option>
          ))}
        </select>
      ) : filterType.length > 0 ? (
        <select
          name="name"
          id="name"
          value={name}
          onChange={(e) => {
            operationBuySelected(e.target.value);
          }}
          className="text-lg font-semibold bg-gray-300 rounded-lg px-2 "
        >
          <option
            disabled={true}
            value=""
            className="bg-gray-400 text-gray-600"
          >
            Select a product
          </option>
          {filterType.map((operation) => (
            <option key={operation.name} value={operation.name}>
              {operation.name}
            </option>
          ))}
        </select>
      ) : (
        <NotProductYet />
      )}
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

  const [mode, setMode] = useState("DEFAULT");
  const [type, setType] = useState("DEFAULT");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("DEFAULT");
  const [buy, setBuy] = useState(0);
  const [sale, setSale] = useState(0);
  const [idProduct, setIdProduct] = useState('')

  const resetFormProd = () => {
    setMode("DEFAULT");
    setType("DEFAULT");
    setName("");
    setQuantity(0);
    setMeasure("DEFAULT");
    setBuy(0);
    setSale(0);
    setIdProduct('')
    console.log("Reseteado", name);
  };

  

  const validationFormProduct = () => {
    if (mode === "DEFAULT") {
      showMesage("Please insert a Operation Mode.", "error");
    } else if (mode === "sale" && operationBuy.length === 0) {
      showMesage("Please insert first a buy operation", "error");
    } else if (type === "DEFAULT") {
      showMesage("Please insert a Operation Type.", "error");
    } else if (name.length === 0) {
      showMesage("The name is necessary.", "error");
    } else if (name.length < 6) {
      showMesage("The name must be over 6 letters.", "error");
    } else if (quantity <= 0) {
      showMesage("Please insert a quantity valid.", "error");
    } else if (measure === "DEFAULT") {
      showMesage("Please insert a Operation Measure", "error");
    } else if (buy <= 0) {
      showMesage("Please insert a Operation Buy valid", "error");
    } else if (sale <= 0) {
      showMesage("Please insert a Operation Sale valid", "error");
    } else {
      showMesage("Operation add", "success");

      let operationPayload 
      resetFormProd();

      if (mode === "buy") {
        operationPayload = {
        mode,
        type,
        name,
        quantity,
        measure,
        buy,
        sale,
        idOperation: uuidv4(),
        idProduct: uuidv4(),
        date: Date.now(),
        quantityRest: quantity
      };
        dispatch({
          type: "add-buyOperation",
          payload: {
            operation: operationPayload,
          },
        });
      } else if (mode === "sale") {
        operationPayload = {
        mode,
        type,
        name,
        quantity,
        measure,
        buy,
        sale,
        idOperation: uuidv4(),
        idProduct: idProduct,
        date: Date.now(),
      };
     
        dispatch({
          type: "add-saleOperation",
          payload: {
            operation: operationPayload,
          },
        });
      }
    }
  };

  const isSale = () => {
    return mode === "sale";
  };

  return (
    <>
      {userName !== "" && (
        <div className=" p-2 md:px-6 ">
          <div className="max-w-3xl min-h-50 mx-auto my-12 rounded-2xl  py-8 px-6 bg-gray-200">
            <h2 className="text-3xl text-center font-bold text-blue-600 text-shadow-xs  shadow-blue-600 py-8">
              Operations:
            </h2>
            <form className="flex flex-col px-4 py-2">
              <div className="grid grid-cols-1  md:grid-cols-2 md:grid-rows-4 gap-x-5  gap-y-6  ">
                <SelectItem
                  name="mode"
                  optionList={modeProduct}
                  handleSelect={setMode}
                  value={mode}
                />

                <SelectItem
                  name="type"
                  optionList={typeProduct}
                  handleSelect={setType}
                  value={type}
                />

                {mode === "buy" || mode === "DEFAULT" ? (
                  <LabelInputString
                    name="name"
                    value={name}
                    labelName={"Product-name"}
                    handleInput={setName}
                  />
                ) : (
                  // <p>Hola</p>
                  //
                  <SelectName
                    operationBuy={operationBuy}
                    handleData={{
                      setName: setName,
                      setBuy: setBuy,
                      setMeasure: setMeasure,
                      setSale: setSale,
                      setType: setType,
                      setIdProduct: setIdProduct
                    }}
                    type={type}
                    name={name}
                  />
                )}

                <LabelInputNumber
                  name="quantity"
                  labelName="Quantity"
                  value={quantity}
                  handleInput={setQuantity}
                />

                <SelectItem
                  name="measure"
                  optionList={measureProduct}
                  handleSelect={setMeasure}
                  value={measure}
                  disabled={isSale()}
                />

                <LabelInputNumber
                  name="buy"
                  labelName="Buy-Price"
                  value={buy}
                  handleInput={setBuy}
                  disabled={isSale()}
                />
                <LabelInputNumber
                  name="sale"
                  labelName="Sale-Price"
                  value={sale}
                  handleInput={setSale}
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
