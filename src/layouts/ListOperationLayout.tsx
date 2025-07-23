import ListOperations from "../components/ListOperations";
import { useParams } from "react-router";
import NavOperationList from "../components/NavOperationList";

const ListOperationLayout = () => {
  const { mode } = useParams();

  return (
    <>
    <div className="h-screen">

      <ListOperations mode={mode}>

       <NavOperationList />
      </ListOperations>
    </div>
    </>
  );
};

export default ListOperationLayout;
