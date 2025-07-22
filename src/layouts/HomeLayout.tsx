import image1 from "/home1.png";

const HomeLayout = () => {
  return (
    <div >
      <section className="max-w-4xl mx-auto relative z-10 py-20  md:pb-40">
        <div className="max-w-4xl mx-4 md:pl-16 py-16 md:py-20 relative z-10 ">
          <div className=" relative z-10">
            <h1 className=" px-8  text-slate-800  text-4xl md:text-5xl font-bold text-shadow-xs  ">
              It's never been easier
            </h1>

            <p className=" mt-10  ml-8 p-8    font-light max-w-4/5 md:max-w-1/2 text-2xl ">
              With{" "}
              <span className="font-medium text-blue-700 text-shadow-sm  ">
                Conta
              </span>
              <span className="font-medium text-green-700 text-shadow-sm  ">
                Tech
              </span>{" "}
              you can manage your business with{" "}
              <span className="font-medium">ease</span> and{" "}
              <span className="font-medium">confidence</span>.
            </p>
          </div>
          <div className="bg-gray-400 opacity-75 absolute top-0 bottom-0 right-0 left-0 md:relative rounded-xl"></div>
        </div>
        <div className="px-8  absolute   top-0  -right-10 bottom-0 h-screen w-3xl overflow-hidden md:top-0 md:left-40 md:right-0 md:h-screen  ">
          <img src={image1} alt="image" />
        </div>
      </section>

      <section className="relative bg-blue-900   ">
        <div className="relative z-10 py-20 ">
          <h2 className="benefit-title py-8">Benefit</h2>
          <div className="space-y-16  md:flex md:items-center md:gap-8 max-w-4xl mx-auto ">
            <ul className="benefit-list  ">
              <li>
                Podras administrar tu negocio dandole seguimiento a las
                operaciones que se realizan por cada trabajador .
              </li>
              <li>
                Controlaras las finanzas de tu negocio dandole seguimiento a
                cada gasto e ingreso .
              </li>
              <li>
                Te dara la posibilidad de prever el desarrollo de tus proyectos
                de inversion asi como la capacidad de tomar acciones en
                consecuencia.
              </li>
            </ul>
            <div className="m-0 p-4 md:p-0 flex-3/7">
              <img src="/estadistic.png" alt="image2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeLayout;
