import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import RegisterLogin from "./components/RegisterLogin";
import RootLayout from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";
// import AboutLayout from "./layouts/AboutLayout";
// import BlogLayout from "./layouts/BlogLayout";
// import HowLayout from "./layouts/HowLayout";
import UseItLayout from "./layouts/UseItLayout";
// import ContactLayout from "./layouts/ContactLayout";
// import WorkingLayout from "./layouts/WorkingLayout";
// import ListOperations from "./components/ListOperations";
import ListOperationLayout from "./layouts/ListOperationLayout";
import WorkingLayout from "./layouts/WorkingLayout";
import NotFound from "./layouts/NotFound";
import useOperation from "./hooks/useOperation";
import { useEffect } from "react";
import OperationDetailLayout from "./layouts/OperationDetailLayout";
import ProductListLayout from "./layouts/ProductListLayout";
import BudgetAdd from "./components/BudgetAdd";

export type UserData = {
  user: string;
  password: string;
};

function App() {
  const {state} = useOperation()

  useEffect(()=> {
    localStorage.setItem('operations', JSON.stringify(state))
  }, [state])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomeLayout />} />
          <Route path="about" element={<WorkingLayout />} />
          {/* <Route path="about" element={<AboutLayout />} /> */}
          <Route path="blog" element={<WorkingLayout />} />
          {/* <Route path="blog" element={<BlogLayout />} /> */}
          <Route path="how" element={<WorkingLayout />} />
          {/* <Route path="how" element={<HowLayout />} /> */}
          <Route path="use">
            <Route index element={<UseItLayout />} />
            <Route path="budget" element={<BudgetAdd />} />
            <Route path="operation-list" >
              <Route index element={<ListOperationLayout />}/>
              <Route
                path=":mode"
                element={<ListOperationLayout />}
              />
            </Route>
          </Route>
          <Route path="contact" element={<WorkingLayout />} />
          {/* <Route path="contact" element={<ContactLayout />} /> */}
          <Route path="operation-detail/:idOperation" element={<OperationDetailLayout />} />
          <Route path="operation-detail/list-product/:idProduct" element={<ProductListLayout />} />
          <Route path="*" element={<NotFound /> } />
          
        </Route>
        <Route path="/login" element={<RegisterLogin />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
