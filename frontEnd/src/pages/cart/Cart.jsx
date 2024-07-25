
import "./cart.css";

import { useDeletOneMutation, useGetDataQuery } from "../../redux/features/api/apiSlice";
import { useCallback, useEffect, useMemo } from "react";
import { errorNotify, successNotify } from "../../utils/Toast";
import { useDispatch } from "react-redux";
import { cartitems } from "../../redux/features/Slice/CartSlice";
const Cart = () => {
  // get category from the database
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(`cart`);
// delet one 
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();
console.log(error);

const dispatch=useDispatch();

console.log(products);
useEffect(() =>{
  dispatch(cartitems(products?.resnumOfCartItems));
  
  if(   errorDelet ){
    errorNotify('خطا في الخادم');

}
  if(SuccessDelet) {
    successNotify('تم حذف العنصر بنجاح');  
  } 
},[SuccessDelet, dispatch, error, errorDelet, products?.resnumOfCartItems])

// handel delet product
const handelDelet = useCallback((productId)=> {
    // if (confirm) true delet product from database
    if (confirm("هل انت متاكد بانك تريد حذف هذا العنصر")) {
      deletOne(`/cart/${productId}`);
     
      }
  },
  [deletOne]
);

  
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
  if (isSuccess && products?.resnumOfCartItems > 0) {
    return products?.data.cartItems.map((product, index) => (
      <tr   key={index}>
        <td className="d-none d-md-table-cell" scope="row">
          {index + 1}
        </td>

        <td className="d-sm-table-cell">
          <img
            style={{ width: "100px", height: "80px" }}
            src={`${products.imageUrl}/${product.product.imageCover}`}
            alt="avatar"
          />
        </td>
        <td className="d-none d-sm-table-cell">{product.product.title?.slice(0, 20)}..</td>
        <td >{product.product.price}$</td>
        <td className="d-none d-md-table-cell">{product.product.priceAfterDiscount}$</td>
        <td>
          <button
            disabled={LoadingDelet}
            onClick={() => handelDelet(product.product._id)}
            className="btn btn-danger"
          >
            {LoadingDelet ? <span className="spinner-border"></span> : "حذف"}
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
}, [LoadingDelet, handelDelet, isLoading, isSuccess, products?.data.cartItems, products?.imageUrl, products?.resnumOfCartItems]);



    return (<>
      <div className="container pt-5 ">
        <h1 className="text-center m-3">
        سلة منتجات</h1>
          {products?.resnumOfCartItems > 0 &&
          <span className="fs-5 p-2">عدد المنتجات  : ( {products?.resnumOfCartItems } )
          </span>}
      
      </div>
         {/* data table */}
      <table className="table pt-5 mt-3 text-center">
          <thead>
            <tr>
              <th
                className="d-none d-md-table-cell"
                scope="col"
              > عدد منتجات

              </th>
              <th className="d-sm-table-cell" scope="col">
                صورة المنتج
              </th>
              <th className="d-none d-sm-table-cell"scope="col">الاسم المنتج</th>
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
      <div className=" w-100  p-2 d-flex align-items-center justify-content-center gap-1">
          {  products?.resnumOfCartItems > 0 &&
          <span className="  fs-2 ">
            {products?.data.totalCartPrice} $
          </span>}
          <button
                disabled={LoadingDelet}
                // onClick={}
                className="btn btn-primary"
              >
                {LoadingDelet ? <span className="spinner-border"></span> : "شراء"}
          </button>
      </div>

     </>);
}

export default Cart;
