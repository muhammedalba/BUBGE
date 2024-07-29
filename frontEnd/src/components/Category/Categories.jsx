
    import { useEffect } from "react";
    import './categories.css'
    import { Link } from "react-router-dom";
    import { ToastContainer} from "react-toastify";
    import logo from "../../imges/logo.png";

    import { useSelector } from "react-redux";

   
import {  useGetDataQuery } from "../../redux/features/api/apiSlice";
import { errorNotify } from "../../utils/Toast";
import { Fade } from "react-awesome-reveal";
// import { Fade } from "react-awesome-reveal"; <Fade delay={0} direction='right' triggerOnce={true} cascade>

    
    const Categories = () => {
      // Get the lookup value from the store
      const search = useSelector((state) => state.serch);
      // get category from the database
      const {
        data: categories,
        error,
        isLoading,
        isSuccess,
      } = useGetDataQuery(`categories`);

  
    
      // view imagesShow
  const imagesShow =
  isSuccess &&
  categories.data.map((preview, index) => {
    console.log(preview);
          return (
            <div
              key={index}
              className={
                index === categories.length
                  ? "carousel-item active h-100 w-100 rounded"
                  : "rounded carousel-item active h-100 w-100"
              }
              data-bs-interval={`${index}000`}
            >
              <img
                className="d-block h-100 rounded  w-100"
                src={`${categories.imageUrl}/${preview.image}`}
                alt={`Preview${index}`}
              />
            </div>
          );
        })
      
      //handel error our  success message 
    
      useEffect(() => {
    
        if (  error) {
          errorNotify("خطأ في الخادم الداخلي");
        }
      }, [ error]);
    

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
          : categories && [...categories.data]
    
      // if sucsses and data is not empty  show the categories
      const showData =
        isSuccess &&
        !isLoading &&filteredUsers.length > 0 ?
        filteredUsers.map((category, index) => {
          return (
          <Fade style={{margin:'auto'}} delay={0}key={index} direction='up' triggerOnce={true} cascade>
            <div  className="card  m-auto " style={{height:'200px',width: '18rem'}}>

                <Link to={`category/${category._id}`} className="">
                    <img style={{height:'150px'}} 
                    src={category.image?`${categories.imageUrl}/${category.image}`:logo} 
                    className="card-img-top" alt="category" />
                    <div style={{height:'50px'}}  className="card-body">
                        <h5 className="card-title text-dark">{category.name}</h5> 
                    </div>
                </Link>
            </div>
          </Fade>
          );
        }): (<div className="w-100">
                <p className="text-center p-3 fs-5 text-primary">
                    العنصر المراد البحث عنه غير موجود
                </p>
            </div>);
    
      // loading styles st
      const arry = [1, 2, 3, 4, 5, 6, 7];
      const spinner =
        isLoading &&
        arry.map((index) => {
          return ( 
                <div key={index} className="card m-auto " style={{height:'200px',width: '18rem'}}>
                    <div  className="w-100 "  style={{height:'150px'}} >
                     <span className="skeleton-loading  h-100 w-100" />
                    </div>
                    <div style={{height:'50px'}} className="card-body">
                        <h5 className="card-title h-100 ">
                        <span className="skeleton-loading w-50 h-100  col-6" />
                        </h5>
                    </div>
                </div>

 
          );
        });
      // loading styles end
      return (
        <div className="w-100 pt-3 categories ">
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

          <div style={{maxWidth:'1300px'}} className="container-fluid my-2">
             {/* Carousel start */}
             <Fade delay={0} direction='left' triggerOnce={true} cascade>

             
            <div
                style={{ width: "100%", height: "375px" }}
                id="carouselExampleInterval"
                className="carousel slide m-auto mt-5"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner h-100 w-100">{imagesShow}</div>
                <button
                  className="carousel-control-prev h-100"
                  type="button"
                  data-bs-target="#carouselExampleInterval"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon "
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next h-100 "
                  type="button"
                  data-bs-target="#carouselExampleInterval"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
            </div>
            </Fade>
            {/* Carousel end */}
            
            <div className="w-100 d-flex row-gap-3 mt-5  gap-2 flex-wrap align-items-center
                                justify-content-between">
                {/*category card */}
  
                  {isLoading ?  spinner:showData }
             
            
    
            </div>
          </div>

 
        </div>
      );
    };

    export default Categories;
    


