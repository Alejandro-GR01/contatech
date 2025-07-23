import { Outlet } from "react-router";
import HeaderMain from "../components/HeaderMain";
import NavegationBar from "../components/NavegationBar";
import ButtonNavBefore from "../components/ButtonNavBefore";

const RootLayout = () => {
  return (
    <>
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="relative z-10 min-h-screen">
          <div className="relative">

          <HeaderMain />
          <NavegationBar />
          </div>
          <div className="relative min-h-screen">

          <Outlet />
          </div>
        </div>
       
        
        <div className="absolute top-0">

        <ButtonNavBefore />
        </div>
       
    
      </div>
    </>
  );
};

export default RootLayout;
