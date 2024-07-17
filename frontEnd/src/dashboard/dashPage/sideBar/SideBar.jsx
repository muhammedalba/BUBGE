import { NavLink } from 'react-router-dom';
import'./SideBarr.css';
// icons
import { FaUsers } from "react-icons/fa";
import { BsClipboardMinus } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa6";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { useEffect, useState } from 'react';



const SideBar = () => {
  const [open,setopen]= useState(false);
  const [display,setdisplay]= useState(true);
 
// Calculate the screen size to set the close and open menu button
useEffect(() => {
  window.addEventListener('resize', () => {
   window.innerWidth <= 767? (setopen(false),setdisplay(false)):setdisplay(true)
  
  });
  return () => {
    window.removeEventListener("resize",setopen)
  };
},[])
// 

// Show or close the sidebar
const handelchang=() => {
  display && setopen(!open)

}


    const nav_Links = [  
        {
          title: " المستخدمون",
          path: "users",
          icon: <FaUsers />,
        },
        {
            title: "الاقسام ",
            path: "categories",
            icon:<BsClipboardMinus/> ,
          }, 
          // {
          //   title: "   الافرع  ",
          //   path: "subcategories",
          //   icon:<BsClipboardMinus/> ,
          // }, 
        
          {
            title: "الشركات ",
            path: "brands",
            icon:<MdOutlineMapsHomeWork/> ,
          },  
           {
            title: "المنتجات ",
            path: "products",
            icon:<FaProductHunt/> ,
          }, 
     
      ];
    
      // get property
      // const bgColor = document.styleSheets[0].cssRules[0].style.getPropertyValue("--bg-color");
    
    
    
      // navLink in map
    
      
      const nav_link_show = nav_Links.map((link, index) => {
        return (
          
          <li key={index} 
          className= "nav-item d-flex align-items-center ">
            <NavLink
            style={{height:'40px'}}
                to={link.path}
                className="nav-link p-2 d-flex  align-items-center fs-5 "
              >
                 {link.icon  }
                <span style={{display:open ? 'block':'none' }} className=" text-nowrap me-2 ">
                {link.title}
                </span>
              </NavLink>  
          </li>
        );
      });

    return (
        <div style={{width:open?'175px':'60px'}} className='sidebar overflow-hidden pt-5 px-2 
          '>
        {  display && <div className='p-2'>< FaBarsStaggered onClick={handelchang} className='m-2' cursor={'pointer'}  /></div>}
           <ul className='p-0 w-100'>
             {nav_link_show}

          </ul>
        </div>
    );
}

export default SideBar;
