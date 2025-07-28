type ButtonGenericProps ={
    title: string,
    handleButon? : ()=> void
}

const ButtonGeneric = ({ title = '', handleButon  }: ButtonGenericProps) => {
  return (
    <button
      type="button"
      className=" bg-blue-700 text-white text-base md:text-lg  font-semibold px-4 py-1 md:px-6 md:py-2 rounded-4xl hover-scale-105 transition-all duration-500 ease-in-out   items-center justify-center shadow-lg text-shadow-2xs cursor-pointer"
      onClick={handleButon}
    >
      {title}
    </button>
  );
};

export default ButtonGeneric;
