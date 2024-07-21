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
import { infoNotify } from "../../../utils/Toast";

const Categories = () => {
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);

  const [Pagination, setPagination] = useState(1);
  // get category from the database
  const [limit, setlimit] = useState(10);
  // get category from the database
  const {
    data: categories,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(`categories?limit=${limit}&page=${Pagination}`);
  console.log(categories?.data);
  // delete category from the database
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();

  // states
  const [sorted, setsorted] = useState(false);

  //handel navigation bar start
  // currentPage
  const handelcurrentPagePagination = (currentPage) => {
    setPagination(currentPage);
  };
  // next page
  const handelPlusPagination = () => {
    setPagination((pre) => pre + 1);
  };
  // prev page
  const handelminusPagination = () => {
    // Pagination >1 && Pagination--
    setPagination((pre) => pre - 1);
  };
  // The number of items to be displayed
  const handelLimetData = (limitData) => {
    if (limitData.target.value > 0 && limitData.target.value <= 50) {
      setlimit(limitData.target.value);
    } else {
      infoNotify("   يجب ان تكون القيمه اقل من 50 واكبر من 0");
    }
  };
  //handel navigation bar end
  
  
  
  //handel error our  success message 

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
  }, [ SuccessDelet, LoadingDelet, errorDelet, error]);

  // handel delet one
    const handelDelet = (id) => {
      const delet = confirm("هل انت متاكد بانك تريد حذف هذا العنصر");
      // if (confirm) true delet user from database
      delet && deletOne(`/categories/${id}`);
    };

  // handel sort
  const handleSort = () => {
    setsorted(!sorted);
  };
  // Filter your search by symbols
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // يضيف \ أمام الأحرف الخاصة
  };

  //// search categories based on the search input  by email, firstname, lastname && sorted (a,b)
  const filteredUsers =
    search.length !== 0
      ? categories?.data.filter((category) => {
        const regex = new RegExp(escapeRegExp(search),"i"); 
        

          return regex.test(category.name);
        })
      : categories &&
        [...categories.data].sort((a, b) =>
          sorted ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
        );

  // if sucsses and data is not empty  show the categories
  const showData =
    isSuccess &&
    !isLoading &&filteredUsers.length > 0 ?
    filteredUsers.map((category, index) => {
      return (
        <tr key={index}>
          <td className="" scope="row">
            {index + 1}
          </td>
          <td  ><span className="">{category.name}</span></td>

          <td className="d-none d-md-table-cell">
            { category.image?<img
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              src={`${categories.imageUrl}/${category.image}`}
              alt="avatar"
            />:'لا يوجد صورة'}
          </td>
          <td>
            <Link to={category._id} className="btn btn-success">
              تعديل
            </Link>
          </td>
          <td>
            <button
              disabled={LoadingDelet ? true : false}
                onClick={() => handelDelet(category._id)}
              className="btn btn-danger"
            >
              {LoadingDelet ? <span className="spinner-border"></span> : "حذف"}
            </button>
          </td>
        </tr>
      );
    }): (<tr><td className="text-center p-3 fs-5 text-primary"colSpan={7} scope="row">العنصر المراد البحث عنه غير موجود في هذه الصفحه</td></tr>);

  // loading styles st
  const arry = [1, 2, 3, 4, 5, 6, 7];
  const spiner =
    isLoading &&
    arry.map((index) => {
      return (
        <tr key={index}>
          <td className="" scope="row">
          <h5 className="skeleton-loading "></h5>
            
          </td>
          <td  ><span className="skeleton-loading"></span></td>

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
        isSuccess={isSuccess}
        isLoading={isLoading}
        path={"createcategory"}
        dataLength={filteredUsers?.length}
      />

      {/* data table */}
      <table className="table pt-5 mt-3">
        <thead>
          <tr>
            <th
              onClick={handleSort}
              className="d-non  d-md-table-cell"
              scope="col"
            >
              {sorted ? <TiArrowSortedUp /> : <TiArrowSortedDown />}ترتيب
            </th>
            <th scope="col">الاسم </th>
            <th className="d-none d-md-table-cell" scope="col">
              الصورة
            </th>
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
        status={categories?.poginationResult || {}}
        PlusAction={handelPlusPagination}
        minusAction={handelminusPagination}
        currentPage={handelcurrentPagePagination}
        limitData={handelLimetData}
      />
    </div>
  );
};

export default Categories;
