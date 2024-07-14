import { NavLink } from 'react-router-dom';
import'./SideBarr.css';
// icons
import { FaUsers } from "react-icons/fa";
import { BsClipboardMinus } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa6";
import { MdOutlineMapsHomeWork } from "react-icons/md";



const SideBar = () => {



    const nav_Links = [  
        {
          title: " المستخدمون",
          path: "users",
          icon: <FaUsers/>,
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
                to={link.path}
                className="nav-link p-2 d-flex  align-items-center fs-5 "
              >
                 {link.icon }
                <span className="px-2 d-none d-md-block  text-nowrap">
                {link.title}
                </span>
              </NavLink>  
          </li>
        );
      });

    return (
        <div className='sidebar pt-5 px-2'>
           {nav_link_show}
        </div>
    );
}

export default SideBar;
