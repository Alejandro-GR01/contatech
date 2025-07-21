
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
import WorkingLayout from "./layouts/WorkingLayout";

export type UserData = {
  user: string;
  password: string;
};

function App() {



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route  >
        <Route path="/" element={<RootLayout/>} >
          <Route index element={<HomeLayout/>} />
          {/* <Route path="about" element={<AboutLayout />} /> */}
          {/* <Route path="blog" element={<BlogLayout />} /> */}
          {/* <Route path="how" element={<HowLayout />} /> */}
          <Route path="use" element={<UseItLayout />} />
          {/* <Route path="contact" element={<ContactLayout />} /> */}
          <Route path="*" element={<WorkingLayout /> } />
        </Route>
        <Route path="/login" element={<RegisterLogin/>} />
      </Route>
    )
  );

  

  return (
  <>
    <RouterProvider router={router} />
  </>

  )
}

export default App;
