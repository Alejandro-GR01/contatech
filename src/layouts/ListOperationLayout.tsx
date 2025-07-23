import ListOperations from "../components/ListOperations";
import { useParams } from "react-router";
import NavOperationList from "../components/NavOperationList";

const ListOperationLayout = () => {
  const { mode } = useParams();

  return (
    <>
      <ListOperations mode={mode}>

       <NavOperationList />
      </ListOperations>
    </>
  );
};

export default ListOperationLayout;
