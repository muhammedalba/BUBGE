import { useGetDataQuery } from "../redux/features/api/apiSlice";


const Cart = () => {
      // get category from the database
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(`cart`);
  isSuccess && console.log(products.data);
    return (
        <div className='pt-5 mt-5'>
            cart 
        </div>
    );
}

export default Cart;
