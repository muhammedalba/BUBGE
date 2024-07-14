import { toast, Zoom } from "react-toastify";

  // hande error messge 
   export const errorNotify=  (ERROR) =>{
    toast.error(ERROR, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "colored",
      transition: Zoom,
 
    });}

    export const successNotify=  (success) =>{
        toast.success(success, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "colored",
          transition: Zoom,
     
    });}
    
    export const infoNotify=  (info) =>{
        toast.info(info, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Zoom,
    
    });}
    export const warnNotify=  (warn) =>{
        toast.warn(warn, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Zoom,
    
    });}