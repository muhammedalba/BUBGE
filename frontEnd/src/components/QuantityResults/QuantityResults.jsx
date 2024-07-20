
import { Link } from 'react-router-dom';
import { RiAddCircleLine } from "react-icons/ri";
import PropTypes from "prop-types";





const QuantityResults = ({handelLimetData,path,isSuccess,dataLength,isLoading}) => { 
   console.log(isLoading,'isLoading');
   console.log(dataLength,'dataLength');
     {/* heade create buttun  && length data && limit data */}
    return (

      <div className="d-flex flex-wrap align-items-center justify-content-between px-2 border-bottom my-2">
            <button 
            disabled={!isSuccess}
              className= { 
                // isSuccess && dataLength > 0  ?
                " btn btn-primary d-flex flex-wrap align-items-center gap-2 "
                // :
                //  " btn btn-primary d-flex flex-wrap align-items-center gap-2 skeleton-loading w-auto"
                 }>
                    <RiAddCircleLine/>
                      <Link 
                
                        to={isSuccess &&  path}
                       className="text-white">
                    اضف عنصر 
                      </Link>            
            </button>
 
                  
                  <div className="w-25 d-none d-sm-flex aligm-items-center  py-2">
                                <label style={{    whiteSpace: 'nowrap'}}
                                  className="p-1 fs-5 d-flex align-items-center gap-1"
                                  htmlFor="image"
                                >
                               عدد النتايج :
                                </label>
                                <input style={{width:'70px', height:'50px',}}       
                                  className="form-control "
                                  min={1}
                                  type="number"
                                  onChange={handelLimetData} 
                                />
                  </div>
                  {/*  */}
                  {!isLoading && dataLength > 0  ? <span className='fs-3 '>عدد النتايج ({dataLength})</span>:
                   <span className='  d-flex align-items-center skeleton-loading fs-3 w-auto p-3'>عدد النتايج </span>
                  }

      </div>
    );
}
QuantityResults.propTypes = {
    path: PropTypes.string.isRequired,
    isSuccess: PropTypes.bool.isRequired,

    dataLength: PropTypes.number,
    handelLimetData: PropTypes.func.isRequired,
  };
export default QuantityResults;
