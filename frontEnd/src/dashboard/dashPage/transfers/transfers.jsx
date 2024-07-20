import { useCallback, useEffect, useState } from "react";
import {
  useGetDataQuery,
  useDeletOneMutation,
  useUpdateOneMutation,
} from "../../../redux/features/api/apiSlice";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

import Navigation from "../../../components/navigation/Navigation";
import { useSelector } from "react-redux";
import QuantityResults from "../../../components/QuantityResults/QuantityResults";
import {
  warnNotify,
  errorNotify,
  infoNotify,
  successNotify,
} from "../../../utils/Toast";

const Transfers = () => {
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);

  const [Pagination, setPagination] = useState(1);
  // get transfers from the database
  const [limit, setlimit] = useState(10);
  // get transfers from the database
  const [confirmed, setconfirmed] = useState(false);
  // get transfers from the database
  const {
    data: Transfers,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(
    `Transfers?limit=${limit}&page=${Pagination}&confirmed=${confirmed}`
  );
  console.log(Transfers?.data);

  // update data (rtk redux)
  const [
    updateOne,
    { error: updateError, isLoading: updateLoading },
  ] = useUpdateOneMutation();
  // console.log(updatedUser);
  // console.log(updateError);

  // delete transfer from the database
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();
  // console.log(errorDelet);
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
      successNotify("تم الحذف بنجاح");
    }
    if(updateError ||errorDelet ||error){
      if (updateError?.status === 400) {
        errorNotify(`   تم تأكيد النقل مقدما `);
      }
      if (errorDelet?.status === 400) {
        warnNotify(`   لم يتم تحويل المبلغ للمحفظة بعد`);
      } else {
        errorNotify("خطأ في الخادم الداخلي");
      }
    }
  }, [SuccessDelet, LoadingDelet, errorDelet, error, updateError]);

  // handel delet one
  const handelDelet = (id) => {
    const delet = confirm("هل انت متاكد بانك تريد حذف هذا العنصر");
    // if (confirm) true delet Transfer from database
    delet && deletOne(`/Transfers/${id}`);
  };
  // handel Confiem
  const handelConfiem = (transferid) => {
    updateOne({
      url: `/transfers/${transferid}`,
      body: { CheckTheTransfer: true },
      method: "put",
    });
  };
  // handel sort
  const handleSort = () => {
    setsorted(!sorted);
  };
  // Filter your search by symbols
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // يضيف \ أمام الأحرف الخاصة
  };

  //// search Transfers based on the search input  by email, firstname, lastname && sorted (a,b)
  const filteredUsers =
    search.length !== 0
      ? Transfers?.data.filter((transfer) => {
          const regex = new RegExp(escapeRegExp(search), "i");

          return regex.test(transfer.user.firstname) || regex.test(transfer.user.email);
        })
      : Transfers &&
        [...Transfers.data].sort(
          (a, b) => sorted && b._id.localeCompare(a._id)
        );

  // if sucsses and data is not empty  show the Transfers
  const showData =
    isSuccess && (!isLoading && filteredUsers.length > 0) ? (
      filteredUsers.map((transfer, index) => {
        console.log(transfer.confirmed, "transfer");
        return (
          <tr className="text-center" key={index}>
            <td className="" scope="row">
              {index + 1}
            </td>
            <td className="d-none d-md-table-cell">
              <span className="">{transfer.user.firstname}</span>
            </td>
            <td className="text-center">
              <span>
                {transfer.confirmed
                  ? transfer.Quantitytransferred
                  : transfer.amount}
              </span>
            </td>
            <td className="text-center">
              <span>{transfer.user.email.slice(0, -9)}</span>
            </td>

            <td className="d-none d-md-table-cell">
              {transfer.image ? (
                <img
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  src={`${Transfers.imageUrl}/${transfer.image}`}
                  alt="avatar"
                />
              ) : (
                "لا يوجد صورة"
              )}
            </td>
            <td className={transfer.confirmed ? "d-none d-md-table-cell" : ""}>
              <button
                type="submit"
                className={
                  !transfer.confirmed ? " btn btn-primary " : "btn btn-success "
                }
                id={transfer._id}
                disabled={transfer.confirmed}
                onClick={() => handelConfiem(transfer._id)}
              >
                {updateLoading ? (
                  <span className="spinner-border"></span>
                ) : transfer.confirmed ? (
                  "تم تاكيد"
                ) : (
                  "   تاكيد"
                )}
              </button>
            </td>
            <td>
              <Link to={transfer._id} className="btn btn-success">

              {LoadingDelet ? (
                  <span className="spinner-border"></span>
                ) : (
                  "عرض"
                )}
              
                
              </Link>
            </td>
            <td>
              <button
                disabled={LoadingDelet ? true : false}
                onClick={() => handelDelet(transfer._id)}
                className="btn btn-danger"
              >
                {LoadingDelet ? (
                  <span className="spinner-border"></span>
                ) : (
                  "حذف"
                )}
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td
          className="text-center p-3 fs-5 text-primary"
          colSpan={8}
          scope="row"
        >
       {   search.length !== 0? " العنصر المراد البحث عنه غير موجود في هذه الصفحه":
        "لا توجد أي عناصر"}
        </td>
      </tr>
    );

  // loading styles st
  const arry = [1, 2, 3, 4, 5, 6, 7];
  const spiner =
    updateLoading ||
    (isLoading &&
      arry.map((index) => {
        return (
          <tr className="text-center" key={index}>
            <td className="" scope="row">
              <h5 className="skeleton-loading "></h5>
            </td>
            <td>
              <span className="skeleton-loading"></span>
            </td>
            <td>
              <span className="skeleton-loading"></span>
            </td>
            <td>
              <span className="skeleton-loading"></span>
            </td>
            <td>
              <span className="skeleton-loading"></span>
            </td>

            <td className="d-none d-md-table-cell ">
              <span className="skeleton-loading "></span>
            </td>
            <td style={{ width: "50px" }}>
              <Link className="btn btn-success  skeleton-loading">
                <span className="">تعديل</span>
              </Link>
            </td>
            <td style={{ width: "50px" }}>
              <button
                className="btn btn-danger skeleton-loading "
                disabled={LoadingDelet ? true : false}
              >
                <span className="">حذف</span>
              </button>
            </td>
          </tr>
        );
      }));
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
        isSuccess
        path={"createtransfer"}
        dataLength={filteredUsers?.length}
        isLoading={isLoading}
      />
      <div
        onClick={useCallback(() => setconfirmed(!confirmed), [confirmed])}
        className="w-100 text-center fs-3"
      >
        {!confirmed ? "الطلبات الحاليه  " : " الطلبات المؤكدة"}
      </div>
      {/* data table */}
      <table className="table pt-5 mt-3">
        <thead>
          <tr className="text-center">
            <th
              onClick={handleSort}
              className="d-non  d-md-table-cell"
              scope="col"
            >
              {sorted ? <TiArrowSortedUp /> : <TiArrowSortedDown />}ترتيب
            </th>
            <th className="d-none d-md-table-cell" scope="col">
              الاسم{" "}
            </th>
            <th scope="col"> المبلغ المحول </th>
            <th scope="col"> البريد الالكتروني </th>
            <th className="d-none d-md-table-cell" scope="col">
              الصورة الوصل
            </th>
            <th
              className={confirmed ? "d-none d-md-table-cell" : ""}
              scope="col"
            >
              {confirmed ? " الطلبات الحاليه" : "الطلبات المؤكده"}
            </th>

            <th scope="col">عرض</th>
            <th scope="col">الحذف</th>
          </tr>
        </thead>
        <tbody className="">{isLoading ? spiner : showData }</tbody>
      </table>
 
      {/*navigation start  */}
      <Navigation
        isLoading={isLoading}
        isSuccess={isSuccess}
        status={Transfers?.poginationResult || {}}
        PlusAction={handelPlusPagination}
        minusAction={handelminusPagination}
        currentPage={handelcurrentPagePagination}
        limitData={handelLimetData}
      />
    </div>
  );
};

export default Transfers;
