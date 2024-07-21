import { useEffect, useState } from "react";
import {
  useGetDataQuery,
  useDeletOneMutation,
} from "../../../redux/features/api/apiSlice";
import { Link } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";


import Navigation from "../../../components/navigation/Navigation";
import { useSelector } from "react-redux";
import QuantityResults from "../../../components/QuantityResults/QuantityResults";






const Users = () => {
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);

  const [Pagination, setPagination] = useState(1);
  // get users from the database 
  const [limit, setlimit] = useState(10);
  // get users from the database 
  const {data:users, error,isLoading,isSuccess,} = useGetDataQuery(`users?limit=${limit}&page=${Pagination}`);

  // delete users from the database
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();


  // states
  const [sorted, setsorted] = useState(false);
  

//handel navigation bar start
// currentPage
const handelcurrentPagePagination=(currentPage)=>{
    setPagination(currentPage) 
  
  }
  // next page
const handelPlusPagination=()=>{
  setPagination(pre=> pre+1)
}
// prev page
const handelminusPagination=()=>{
  // Pagination >1 && Pagination--
  setPagination(pre=> pre-1)


}
// The number of items to be displayed
const handelLimetData=(limitData)=>{
 if(limitData.target.value > 0 && limitData.target.value <= 50  ) {
  setlimit(limitData.target.value)
}else{
  toast.info("   يجب ان تكون القيمه اقل من 50 واكبر من 0", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "colored",
    transition: Zoom,
  });
 }

}
//handel navigation bar end





  useEffect(() => {
    
    if (!LoadingDelet && SuccessDelet) {
      toast.success("تم الحذف بنجاح", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Zoom,
      });
    }

    if (errorDelet || error) {
      toast.error("خطأ في الخادم الداخلي", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Zoom,
      });
    }
  }, [Pagination,SuccessDelet, LoadingDelet, errorDelet, error,limit]);





// handel delet one
  const handelDelet = (id) => {
    const delet = confirm("هل انت متاكد بانك تريد حذف هذا العنصر");
    // if (confirm) true delet user from database
    delet && deletOne(`/users/${id}`);
  };



  // handel sort
  const handleSort = () => {
    setsorted(!sorted)
  };

  // Filter your search by symbols
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').toLowerCase(); // يضيف \ أمام الأحرف الخاصة
  };

//// search users based on the search input  by email, firstname, lastname && sorted (a,b)
  const filteredUsers = search.length != 0 ? users?.data.filter((user) => {
    const regex = new RegExp(escapeRegExp(search), "i");
    return regex.test(user.firstname) || regex.test(user.lastname) || regex.test(user.email);
  }) :
   users && [...users.data].sort((a, b) => sorted ?b.firstname.localeCompare(a.firstname): a.firstname.localeCompare(b.firstname));



// if sucsses and data is not empty  show the users
  const showData = isSuccess && !isLoading &&filteredUsers.length > 0  ? filteredUsers.map((user, index) => {
    return (
      <tr key={index}>
        <td className="" scope="row">{index +1}</td>
        <td>{user.firstname}</td>
        <td style={{ maxWidth: '140px', overflow: 'hidden' }} className="d-none d-sm-table-cell">{user.email}</td>
        <td className="d-none d-md-table-cell">{user.role}</td>
        <td className="d-none d-md-table-cell">
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={`${users.imageUrl}/${user.image}`}
            alt="avatar"
          />
        </td>
        <td>
          <Link to={user._id} className="btn btn-success">
            تعديل
          </Link>
        </td>
        <td>
          {user.role.toLowerCase() !== "admin" && (
            <button
              disabled={LoadingDelet ? true : false}
              onClick={() => handelDelet(user._id)}
              className="btn btn-danger"
            >
           {  LoadingDelet? <span className="spinner-border"></span>:
              'حذف'}
            </button>
          )}
        </td>
      </tr>
    );
  }): (<tr><td className="text-center p-3 fs-5 text-primary"colSpan={7} scope="row">العنصر المراد البحث عنه غير موجود في هذه الصفحه</td></tr>)

     
 
  // loading styles st   
  const arry = [1, 2, 3, 4, 5, 6, ];
  const spiner = isLoading &&     arry.map((index) => {
    return (
      <tr key={index}>
        <td className="" scope="row">
        <h5 className="skeleton-loading "></h5>
          
        </td>
        <td  ><span className="skeleton-loading"></span></td>
        <td  className="d-none d-sm-table-cell"><span className="skeleton-loading"></span></td>
        <td  className="d-none d-md-table-cell"><span className="skeleton-loading"></span></td>

        <td className="d-none d-md-table-cell ">
        <span className="skeleton-loading "></span>
        </td>
        <td style={{width:'50px'}}>
          <Link className="btn btn-success  skeleton-loading">
            
          <span className="">تعديل</span>
          </Link>
        </td>
        <td style={{width:'50px'}} >
          <button
            className="btn btn-danger skeleton-loading "
            disabled={LoadingDelet ? true : false}
             
          >
            <span className="">حذف</span>
          </button>
        </td>
      </tr>
    );
  });

  // loading styles end 
  return (
  <div className="w-100 pt-5 ">
    {/* tosat compunenet */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
     
      {/*  create buttun  && length data && limit data */}
      <QuantityResults
       handelLimetData={handelLimetData}  
        isSuccess ={isSuccess}
        isLoading={isLoading}
       path={'createUser'}
       dataLength={filteredUsers?.length}/>
            
      {/* data table */}
      <table className="table pt-5 mt-3">
        <thead>
          <tr >
            <th onClick={handleSort} className="d-non  d-md-table-cell" scope="col">{ sorted?<TiArrowSortedUp />:<TiArrowSortedDown/>}ترتيب</th>
            <th scope="col">الاسم الاول</th>
            <th className="d-none d-sm-table-cell" scope="col">البريد الالكتروني</th>
            <th className="d-none d-md-table-cell" scope="col">المهمه</th>
            <th className="d-none d-md-table-cell" scope="col">الصورة</th>
            <th scope="col">عرض</th>
            <th scope="col">الحذف</th>
          </tr>
        </thead>
        <tbody className="">{isLoading ? spiner : showData}</tbody>
      </table>
      
      {/*navigation start  */}
      <Navigation 
      isLoading={isLoading}
      isSuccess={isSuccess} 
      status={users?.poginationResult|| {}} 
      PlusAction={handelPlusPagination}
      minusAction={handelminusPagination}
      currentPage={handelcurrentPagePagination}
      limitData={handelLimetData}
      />
 
    
  </div>

  );
};

export default Users;
