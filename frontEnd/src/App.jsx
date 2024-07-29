
import {
  Outlet,
  // RouterProvider,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";


import ProfileAccount from "./pages/ProfileAccount/ProfileAccount";
import Footer from "./components/Footer/Footer";

// import { routes } from "../Routes";



function App() {

  return (  
  
  <div className="App "> 
    <Header/>
    {/* <ProfileAccount/> */}
    <div style={{minHeight:'calc(100vh - 120px)'}} className=" mt-5 pt-5 h-100 position-relative">
      <Outlet/>
    </div>

  <Footer/>

  </div>
  );
}

export default App;
