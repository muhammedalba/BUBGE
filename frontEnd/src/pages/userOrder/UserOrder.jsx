

    import { useCallback, useEffect, useMemo, useState } from "react";

    import { Link, useParams } from "react-router-dom";
    
    import { ToastContainer } from "react-toastify";
    
    import { TiArrowSortedDown } from "react-icons/ti";
    import { TiArrowSortedUp } from "react-icons/ti";
    
    import { errorNotify } from "../../utils/Toast";
    import { useGetDataQuery } from "../../redux/features/api/apiSlice";


    
    const UserOrder = () => {
        //   get user id from params
        const {orderId}=useParams();
    
      // get order from the database
      const {
        data: order,
        error,
        isLoading,
        isSuccess,
      } = useGetDataQuery(`orders/${orderId}`);
    
      console.log(order, "order");
    
      // states
      const [sorted, setsorted] = useState(false);
    
      
      useEffect(() => {
        if (error) {
          errorNotify("خطا في الخادم");
        }
      }, [error]);
    
      // handel sort
      const handleSort = () => {
        setsorted(!sorted);
      };

    

      // if sucsses and data is not empty  show the order
   // if sucsses and data is not empty  show the products
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
            <Link className="btn btn-success skeleton-loading">
              <span className="">تعديل</span>
            </Link>
          </td>
          <td style={{ width: "50px" }}>
            <button
              className="btn btn-danger skeleton-loading "
              disabled
            >
              <span className="">حذف</span>
            </button>
          </td>
        </tr>
      ));
    }
    if (isSuccess ) {
      return order.data?.cartItems?.map((product, index) => (
        <tr key={index}>
          <td className="" scope="row">
            {index + 1}
          </td>
          <td>{product.product.title?.slice(0, 20)}..</td>
          <td
            style={{ maxWidth: "140px", overflow: "hidden" }}
            className="d-none d-sm-table-cell"
          >
            {product.product?.category ? product.product.category?.name : "غير محدد"}
          </td>
          <td
            style={{ maxWidth: "140px", overflow: "hidden" }}
            className="d-none d-sm-table-cell"
          >
            {product.product?.brand ? product.product.brand?.name : "غير محدد"}
          </td>
          <td className="d-none d-md-table-cell">{product.price}$</td>
          <td className="d-none d-md-table-cell">
            <img
              style={{ width: "100px", height: "80px" }}
              src={`${order.imageUrl}/${product.product.imageCover}`}
              alt="avatar"
            />
          </td>
          <td>
            <span className={order.data.isDelivered ? "text-success":" text-danger"}>
            
          { order.data.isDelivered ? (
                  "تم الارسال"
                ) : (
                  "لم يتم الارسال")}
             
            </span>
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
          العنصر المراد البحث عنه غير موجود في هذه الصفحة
        </td>
      </tr>
    );
  }, [isLoading, isSuccess, order]);
    
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
    
      
   
          {/* data table */}
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
            <th scope="col">الاسم المنتج</th>
            <th className="d-none d-sm-table-cell" scope="col">
              اسم القسم
            </th>
            <th className="d-none d-sm-table-cell" scope="col">
              اسم الشركه
            </th>
            <th className="d-none d-md-table-cell" scope="col">
              السعر
            </th>
            <th className="d-none d-md-table-cell" scope="col">
              صورة المنتج
            </th>
            <th scope="col">الحالة</th>
           
         
          </tr>
        </thead>
        <tbody className="">{showData}</tbody>
      </table>
    
  
        </div>
      );
    };
    
   
    


export default UserOrder;
