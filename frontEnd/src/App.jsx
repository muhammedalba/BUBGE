
import {
  Outlet,
  // RouterProvider,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import ProfileAccount from "./pages/ProfileAccount/ProfileAccount";
// import { routes } from "../Routes";



function App() {

  return (  
  
  <div className="App"> 
    <Header/>
    {/* <ProfileAccount/> */}
    <div className=" mt-5 pt-5">
      <Outlet/>
    </div>



 </div>
  );
}

export default App;
