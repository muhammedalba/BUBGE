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
import Cart from "./src/pages/cart/Cart";
import ProfileAccount from "./src/pages/ProfileAccount/ProfileAccount";
import UserTransfer from "./src/pages/userTransfer/UserTransfer";

import AddTransfer from "./src/pages/userTransfer/AddTransfer";
import TransFer from "./src/pages/userTransfer/TransFer";
import UserOrders from "./src/pages/userOrder/userOrders";
import UserOrder from "./src/pages/userOrder/UserOrder";
import Orders from "./src/dashboard/dashPage/orders/Orders";
import MinPage from "./src/dashboard/dashPage/MinPage";




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
      { path: "orders", element: <UserOrders /> },
      { path: "orders/:orderId", element: <UserOrder /> },
      { path: "ProfileAccount", element: <ProfileAccount /> },
      { path: "createtransfer", element: <AddTransfer /> },
      { path: "transfers/:TransferId", element: < TransFer/> },
      { path: "ProfileAccount/:userid/transfer", element: <UserTransfer /> },
    ],
  },

  //  dashboard
  {
    path: "/dashboard",
    element: (
      // Path protection
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <MinPage /> },
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
      
      { path: "transfers/:transfersId", element: <Transfer /> },
      { path: "orders", element: <Orders /> },
      { path: "orders/:orderId", element: <UserOrder /> },
    ],
  },
]);
