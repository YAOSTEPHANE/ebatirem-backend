import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './page/Home'
import SignupPage from './page/SignupPage';
import LoginPage from './page/LoginPage';
import CartPage from './page/CartPage';
import Checkout from './page/Checkout';
import {


  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailPage from './page/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
    element: <CartPage></CartPage>,
  },
   {
    path: "/checkout",
    element: <Checkout></Checkout>,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage></ProductDetailPage>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
