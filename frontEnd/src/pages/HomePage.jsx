import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import './hmepage.css'


const HomePage = () => {
  return (<>
      <Header/>
  <div className=" homePage">
      
      <Outlet/>
  </div>
  
  
  
  </>




  


);
};

export default HomePage;
