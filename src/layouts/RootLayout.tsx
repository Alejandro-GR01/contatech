import { Outlet } from "react-router";
import HeaderMain from "../components/HeaderMain";
import NavegationBar from "../components/NavegationBar";

const RootLayout = () => {
  return (
    <>
      <HeaderMain />
      <NavegationBar />
      <Outlet /> 
    </>
  );
};

export default RootLayout;
