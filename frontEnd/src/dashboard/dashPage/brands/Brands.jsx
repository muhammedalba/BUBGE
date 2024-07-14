import { useEffect, useState } from "react";
import {
  useGetDataQuery,
  useDeletOneMutation,
} from "../../../redux/features/api/apiSlice";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

import Navigation from "../../../components/navigation/Navigation";
import { useSelector } from "react-redux";
import QuantityResults from "../../../components/QuantityResults/QuantityResults";
import { errorNotify, infoNotify, successNotify } from "../../../utils/Toast";

const Brands = () => {
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);

  const [Pagination, setPagination] = useState(1);
  // get brands from the database
  const [limit, setlimit] = useState(10);
  // get brands from the database
  const {
    data: brands,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(`brands?limit=${limit}&page=${Pagination}`);
  console.log(brands?.data);
  // delete brands from the database
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
      successNotify("تم الحذف بنجاح")

    }

    if (errorDelet || error) {
      errorNotify("خطأ في الخادم الداخلي")
   
    }
  }, [ SuccessDelet, LoadingDelet, errorDelet, error]);

  // handel delet one
    const handelDelet = (id) => {
      const delet = confirm("هل انت متاكد بانك تريد حذف هذا العنصر");
      // if (confirm) true delet user from database
      delet && deletOne(`/brands/${id}`);
    };

  // handel sort
  const handleSort = () => {
    setsorted(!sorted);
  };
  // Filter your search by symbols
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // يضيف \ أمام الأحرف الخاصة
  };

  //// search brands based on the search input  by email, firstname, lastname && sorted (a,b)
  const filteredUsers =
    search.length !== 0
      ? brands?.data.filter((brand) => {
        const regex = new RegExp(escapeRegExp(search),"i"); 
        

          return regex.test(brand.name);
        })
      : brands &&
        [...brands.data].sort((a, b) =>
          sorted ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
        );

  // if sucsses and data is not empty  show the brands
  const showData =
    isSuccess &&
    !isLoading &&filteredUsers.length > 0 ?
    filteredUsers.map((brand, index) => {
      return (
        <tr key={index}>
          <td className="" scope="row">
            {index + 1}
          </td>
          <td  ><span className="">{brand.name}</span></td>

          <td className="d-none d-md-table-cell">
            { brand.image?<img
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              src={`${brands.imageUrl}/${brand.image}`}
              alt="avatar"
            />:'لا يوجد صورة'}
          </td>
          <td>
            <Link
              
              to={!LoadingDelet && brand._id}
              className="btn btn-success">
            {LoadingDelet ? <span className="spinner-border"></span> : "تعديل"}

              
            </Link>
          </td>
          <td>
            <button
              disabled={LoadingDelet ? true : false}
                onClick={() => handelDelet(brand._id)}
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
      {/* tosat compunenet start*/}
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
        {/* tosat compunenet end*/}
      {/*  create buttun  && length data && limit data */}
      <QuantityResults
        handelLimetData={handelLimetData}
        isSuccess
        path={"createbrand"}
        dataLength={filteredUsers?.length}
      />

      {/* data table start*/}
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
       {/* data table end*/}
      {/*navigation start  */}
      <Navigation
        isLoading={isLoading}
        isSuccess={isSuccess}
        status={brands?.poginationResult || {}}
        PlusAction={handelPlusPagination}
        minusAction={handelminusPagination}
        currentPage={handelcurrentPagePagination}
        limitData={handelLimetData}
      />
      {/*navigation end  */}
    </div>
  );
};

export default Brands;
