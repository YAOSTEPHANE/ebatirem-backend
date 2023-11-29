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
import Protected from './features/auth/components/Protected';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
    </Protected>,
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
    element: <Protected>
      <CartPage></CartPage>
    </Protected>,
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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
