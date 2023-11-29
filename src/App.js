import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home'
import AdminHome from './pages/AdminHome';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import AdminOdersPage from './pages/AdminOrdersPage';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import Cart from './features/cart/Cart';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailPage from './pages/ProductDetailPage';
import PageNotFound from './pages/404';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import Protected from './features/auth/components/Protected';
import { useDispatch } from 'react-redux';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProductFormPage from './pages/AdminProductFormPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
    </Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin>
      <AdminHome></AdminHome>
    </ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected>
      <Checkout></Checkout>
    </Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected>
      <ProductDetailPage></ProductDetailPage>
    </Protected>,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin>
      <AdminProductDetailPage></AdminProductDetailPage>
    </ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin>
      <AdminOdersPage></AdminOdersPage>
    </ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>,
  },
  {
    path: "/order-success/:id",
    element:
      <OrderSuccessPage></OrderSuccessPage>

  },
  {
    path: "/orders",
    element:
      <UserOrdersPage></UserOrdersPage>

  },
  {
    path: "/profile",
    element:
      <UserProfilePage></UserProfilePage>

  },
  {
    path: "/logout",
    element:
      <Logout></Logout>

  },
  {
    path: "/forgot-password",
    element:
      <ForgotPasswordPage></ForgotPasswordPage>

  },
  {
    path: "*",
    element:
      <PageNotFound></PageNotFound>

  },

]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);


  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])


  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* Link must be inside the Provider */}
    </div>
  );
}

export default App;
