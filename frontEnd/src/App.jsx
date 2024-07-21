
import {
  Outlet,
  // RouterProvider,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
// import { routes } from "../Routes";



function App() {

  return (  
  
  <>
    <Header/>
    <div className="App mt-5 pt-5">
      <Outlet/>
    </div>



 </>
  );
}

export default App;
