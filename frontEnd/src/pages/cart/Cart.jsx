import "./cart.css";

import {
  useCreateOneMutation,
  useDeletOneMutation,
  useGetDataQuery,
} from "../../redux/features/api/apiSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { errorNotify, infoNotify, successNotify, warnNotify } from "../../utils/Toast";
import { useDispatch } from "react-redux";
import { cartitems } from "../../redux/features/Slice/CartSlice";
import { ToastContainer } from "react-toastify";
const Cart = () => {
  // get category from the database
  const { data: products,error,isLoading,isSuccess,} = useGetDataQuery(`cart`);
  // delet one
  const [deletOne,{ error: errorDelete, isLoading: LoadingDelet, isSuccess: successDelete }, ] = useDeletOneMutation();
  console.log(error);
  // create one
  const [CreateOne,{ error: errorCreate, isLoading: LoadingCreate, isSuccess: successCreate },] = useCreateOneMutation();

  const dispatch = useDispatch();

  console.log(errorCreate);

  const [productsDetails, setProductsDetails] = useState([
    {
      id: "",
      resnumOfCartItems: 0,
      totalCartPrice: 0,
      cartItems: [],
      imageUrl: "",
    },
  ]);



  useEffect(() => {
    if (isSuccess && !isLoading) {
      const { _id, totalCartPrice, cartItems  } = products.data;
      dispatch(cartitems(products?.resnumOfCartItems));
      setProductsDetails({ id: _id, totalCartPrice, cartItems, resnumOfCartItems:products?.resnumOfCartItems, imageUrl :products?.imageUrl});
    }
    if (errorDelete) errorNotify("خطا في الخادم");
   
      if (successDelete) successNotify("تم حذف العنصر بنجاح");

    if (successCreate) {
      successNotify("تم طلب العنصر بنجاح");
      
    }
    if (errorCreate?.status===400) {
      warnNotify(' تاكد من وجود اموال كافيه في المحفظة');
    }
    // products infinity loop 
  }, [dispatch, errorCreate?.status, errorDelete, isLoading, isSuccess, productsDetails?.resnumOfCartItems, successCreate, successDelete]);

  // handel delet product
  const handelDelet = useCallback(
    (productId) => {
      // if (confirm) true delet product from database
      if (confirm("هل انت متاكد بانك تريد حذف هذا العنصر")) {
        deletOne(`/cart/${productId}`);
      }
    },
    [deletOne]
  );
// clear Cart
  const clearCart = useCallback(
    () => {
    if (confirm("هل انت متاكد بانك تريد مسح كافة العناصر من السلة")) {
      deletOne(`/cart`);
      setProductsDetails([])
    }}
   , [deletOne])
  // show products
  const showData = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 6 }, (_, index) => (
        <tr key={index}>
          <td className="" scope="row">
            <h5 className="skeleton-loading "></h5>
          </td>
          <td>
            <span className="skeleton-loading"></span>
          </td>
          <td className="d-none d-sm-table-cell">
            <span className="skeleton-loading"></span>
          </td>
          <td className="d-none d-md-table-cell">
            <span className="skeleton-loading"></span>
          </td>
          <td className="d-none d-md-table-cell ">
            <span className="skeleton-loading "></span>
          </td>
          <td style={{ width: "50px" }}>
            <button
              className="btn btn-danger skeleton-loading "
              disabled={LoadingDelet}
            >
              <span className="">حذف</span>
            </button>
          </td>
        </tr>
      ));
    }
    if (isSuccess && productsDetails?.resnumOfCartItems > 0) {
      return productsDetails.cartItems.map((product, index) => (
        <tr key={index}>
          <td className="d-none d-md-table-cell" scope="row">
            {index + 1}
          </td>

          <td className="d-sm-table-cell">
            <img
              style={{ width: "100px", height: "80px" }}
              src={`${products.imageUrl}/${product?.product?.imageCover}`}
              alt="avatar"
            />
          </td>
          <td className="d-none d-sm-table-cell">
            {product.product?.title?.slice(0, 20)}..
          </td>
          <td>{product?.product?.price}$</td>
          <td className="d-none d-md-table-cell">
            {product?.product?.priceAfterDiscount}$
          </td>
          <td>
            <button
              disabled={LoadingDelet}
              onClick={() => handelDelet(product?.product?._id)}
              className="btn btn-danger"
            >
              {LoadingDelet || LoadingCreate ? (
                <span className="spinner-border"></span>
              ) : (
                "حذف"
              )}
            </button>
          </td>
        </tr>
      ));
    }
    return (
      <tr>
        <td
          className="text-center p-3 fs-5 text-primary"
          colSpan={7}
          scope="row"
        >
          السلة فارغه
        </td>
      </tr>
    );
  }, [
    LoadingCreate,
    LoadingDelet,
    handelDelet,
    isLoading,
    isSuccess,
    products,
    productsDetails,
  ]);
  // handel Create Order
  const handelCreateOrder = () => {
    if (productsDetails.resnumOfCartItems > 0) {
      const cartId = productsDetails.id;
      // create order and send email to admin and customer
      CreateOne({
        url: `/orders/${cartId}`,
        method: "post",
      });
    } else {
      infoNotify("لايوجد منتجات في السلة");
    }
  };

  return (
    <>
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
      <div className="container-fluid pt-5 ">
          <h1 className="text-center m-3">سلة منتجات</h1>
          {productsDetails?.resnumOfCartItems > 0 && (
            <span className="fs-5 p-2">
              عدد المنتجات : ( {isSuccess ? productsDetails?.resnumOfCartItems:0} )
            </span>
          )}
          {/* data table */}
          <table className="table pt-5 mt-3 text-center">
            <thead>
              <tr>
                <th className="d-none d-md-table-cell" scope="col">
                  {" "}
                  عدد منتجات
                </th>
                <th className="d-sm-table-cell" scope="col">
                  صورة المنتج
                </th>
                <th className="d-none d-sm-table-cell" scope="col">
                  الاسم المنتج
                </th>
                <th className="d-table-cell" scope="col">
                  السعر
                </th>
                <th className="d-none d-md-table-cell" scope="col">
                  السعر بعد الخصم
                </th>
                <th scope="col">الحذف</th>
              </tr>
            </thead>
            <tbody className="">{showData}</tbody>
          </table>
          {/* checkout */}
          <div className=" w-100  p-2 d-flex align-items-center justify-content-center gap-1">
            { productsDetails?.resnumOfCartItems > 0 && (
              <span className="  fs-2 ">
                المجموع : (
                {isSuccess && productsDetails?.totalCartPrice
                  ? productsDetails?.totalCartPrice
                  : 0}
                )<span className="ps-1 text-success">$</span>
              </span>
            )}

          
      {  isSuccess && productsDetails?.resnumOfCartItems > 0 &&  
          <>  <button type="button"
                      disabled={
                        ( LoadingDelet || LoadingCreate)?true:false
                      }
                      onClick={handelCreateOrder}
                      className="btn btn-primary"
                    >
                      {LoadingDelet || LoadingCreate ? (
                        <span className="spinner-border"></span>
                      ) : (
                        "شراء"
                      )}
          </button>

            <button
                  disabled={
                    LoadingDelet || LoadingCreate || productsDetails?.length <= 0
                  }
                  onClick={clearCart}
                  className="btn btn-danger "
                >
                  {LoadingDelet || LoadingCreate ? (
                    <span className="spinner-border"></span>
                  ) : (
                    "حذف كل المنتجات"
                  )}
            </button>
        </>  }
          </div>
      </div>
    </>
  );
};

export default Cart;
