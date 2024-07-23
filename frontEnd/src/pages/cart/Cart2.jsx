import "./cart.css";
import logo from '../../imges/logo.png'



const Cart2 = () => {
  return (
    <div className="container-fluid pt-5 ">
      <h1 className="text-center m-3">سلة منتجات</h1>




      <div className="product mb-1 d-flex align-items-center rounded-2 ">
         <img src={logo} alt="منتج 1" />
        <div className="product-info">
         <h2>منتج 1</h2>
         <p>وصف المنتج 1</p>
         <span>$10</span>
  
        </div>
        <button className=" btn btn-danger">حذف</button>
      </div>







      <div className="row ">
      <div className="col-sm-3">
        <img style={{width:'50px', height:'50px'}} src={logo}alt="منتج 2" />

      </div>

        <div className="product-info col-sm-8">
           <h2>منتج 2</h2>
           <p>وصف المنتج 2</p>
           <span className="fs-4">$15</span>
          
        </div>


         <button className="btn btn-danger col-sm-8">حذف</button>
      </div>


    </div>
  );
};

export default Cart2;
