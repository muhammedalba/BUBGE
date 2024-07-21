import {
  // Route,
  createBrowserRouter,
  // createRoutesFromElements,
} from "react-router-dom";
import App from "./src/App";
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
import ProtectedRoute from "./src/utils/ProtectedRoute";
import Category from "./src/dashboard/dashPage/categories/Category";
import ProductsCategory from "./src/pages/ProductsCategory";
import Cart from "./src/pages/Cart";

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
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "category/:CategoryId", element: <ProductsCategory /> },
      { path: "verifyresetcode", element: <Verifyresetcode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "cart", element: <Cart /> },
    ],
  },

  //  dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "users", element: <Users /> },
      { path: "users/createUser", element: <CreateUser /> },
      { path: "users/:userId", element: <User /> },
      { path: "categories", element: <Categories /> },
      { path: "categories/:CategoryId", element: <Category /> },
      { path: "categories/createCategory", element: <Createcategory /> },
      { path: "subcategories", element: <SubCategories /> },
      { path: "subcategories/:subcategoryId", element: <SubCategory /> },
      {
        path: "subcategories/createSubCategory",
        element: <CreateSubCategory />,
      },
      { path: "products", element: <Products /> },
      { path: "products/createProduct", element: <CreatProduct /> },
      { path: "products/:productId", element: <Product /> },
      { path: "brands", element: <Brands /> },
      { path: "brands/createBrand", element: <CreateBrands /> },
      { path: "brands/:brandId", element: <Brand /> },
      { path: "transfers", element: <Transfers /> },
      { path: "transfers/createTransfers", element: <CreateBrands /> },
      { path: "transfers/:transfersId", element: <Transfer /> },
    ],
  },
]);
