import { Link } from "react-router";
import ButtonGeneric from "./ButtonGeneric";

const NavOperationList = () => {
  return (
    <div className="grid  grid-rows-3 grid-cols-1 md:grid-cols-3 md:grid-rows-1 justify-items-center gap-4 py-15">
      <Link to={"/use/operation-list"}>
        <ButtonGeneric title="Show All Operations" />
      </Link>
      <Link to={"/use/operation-list/buy"}>
        <ButtonGeneric title="Buy" />
      </Link>
      <Link to={"/use/operation-list/sale"}>
        <ButtonGeneric title="Sale" />
      </Link>
    </div>
  );
};

export default NavOperationList;
