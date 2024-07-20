import {
  // Route,
  createBrowserRouter,
  // createRoutesFromElements,
} from "react-router-dom";

import SignUp from "./src/auth/signup/SignUp";
import Login from "./src/auth/login/Login";
import Dashboard from "./src/dashboard/dashPage/Dashboard";
import CreateUser from "./src/dashboard/dashPage/users/CreateUser";
import HomePage from "./src/pages/HomePage";
import ForgotPassword from "./src/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./src/auth/resetPassword/ResetPassword";
import Users from "./src/dashboard/dashPage/users/Users";

import Verifyresetcode from "./src/auth/Verifyresetcode/VerifyResetCode";
import User from "./src/dashboard/dashPage/users/User";
import Categories from "./src/dashboard/dashPage/categories/Categories";
import Category from "./src/dashboard/dashPage/categories/Category";
import Createcategory from "./src/dashboard/dashPage/categories/Createcategory";

import Products from "./src/dashboard/dashPage/products/Products";
import CreatProduct from "./src/dashboard/dashPage/products/CreatProduct";
import Product from "./src/dashboard/dashPage/products/Product";

import SubCategory from "./src/dashboard/dashPage/subcategory/SubCategory";
import SubCategories from "./src/dashboard/dashPage/subcategory/SubCategories";
import CreateSubCategory from "./src/dashboard/dashPage/subcategory/CreateSubCategory";

import Brands from "./src/dashboard/dashPage/brands/Brands";
import CreateBrands from "./src/dashboard/dashPage/brands/CreateBrands";
import Brand from "./src/dashboard/dashPage/brands/Brand";
import Transfers from "./src/dashboard/dashPage/transfers/transfers";
import Transfer from "./src/dashboard/dashPage/transfers/Transfer";


// export const routes = createBrowserRouter(
//     createRoutesFromElements([
//       <Route key={1} path="/" element={<HomePage />} >
//           <Route key={2} path="/signup" element={<SignUp />} />,
//           <Route key={3} path="/login" element={<Login />} />,
//           <Route key={3} path="/forgotPassword" element={<ForgotPassword />} />,
//           <Route key={3} path="/resetPassword" element={<ResetPassword />} />,

//       </Route>,

//       <Route key={4} path="/dashboard" element={<Dashboard />}>
//           <Route key={3} path="createuser" element={<CreateUser />} />,
//           <Route key={3} path="users" element={<Users />} />,

//       </Route>

//     ])
//   );

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "verifyresetcode",
        element: <Verifyresetcode />,
      },
    ],
  },
  { 
    path: "/dashboard",
    element: <Dashboard />,
    children: [
    // users
      {
        path: "users",
        element: <Users />,

      },
      {
        path: "users/createUser",
        element: <CreateUser />,
      },
      {
        path: "users/:userId",
        element: <User />,
      },
      //categories
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/:CategoryId",
        element: <Category />,
      },
      {
        path: "categories/createcategory",
        element: <Createcategory />,
      },
         //subcategory
      {
        path: "subcategories",
        element: <SubCategories />,
      },
      {
        path: "subcategories/:subcategoryId",
        element: <SubCategory />,
      },
      {
        path: "subcategories/createsubcategory",
        element: <CreateSubCategory />,
      },
      // products
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/createproduct",
        element:<CreatProduct/> ,
      }, 
      {
        path: "products/:productId",
        element: <Product />,
      },
      // brands
      {
        path: "brands",
        element: <Brands />,
      }, 
      {
        path: "brands/createbrand",
        element: <CreateBrands />,
      }, 
      {
        path: "brands/:brandId",
        element: < Brand/>,
      },
      // transfers
      {
        path: "transfers",
        element: <Transfers />,
      }, 
      {
        path: "transfers/createtransfers",
        element: <CreateBrands />,
      }, 
      {
        path: "transfers/:transfersId",
        element: < Transfer/>,
      },

    ],
  },
]);
