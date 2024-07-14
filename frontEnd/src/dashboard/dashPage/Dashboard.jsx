
import TopBar from "./topbar/TopBar";
import SideBar from "./sideBar/SideBar";
import { Outlet } from "react-router-dom";


const Dashboard = () => { 
  return (
    <>
    
      <TopBar />
      <div className="pt-5 mt-5  d-flex  gap-2">
      <SideBar />
      <Outlet  />
      </div>
    </>
  );
};

export default Dashboard;
