import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./component/LoginPage/Login";
import SignUp from "./component/SignUpPage/SignUp";
import Home from "./component/HomePage/Home";

const AppRouter=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/home",
    element:<Home/>
  }
])

function App() {
 return(
  <RouterProvider router={AppRouter}>

  </RouterProvider>
 )
}

export default App;
