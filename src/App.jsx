import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Root } from "./routes/Root.jsx";
import { Advertisements } from "./pages/Advertisements/Advertisements.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { AnotherAccount } from "./pages/AnotherAccount/AnotherAccount.jsx";
import { Profile } from "./pages/Profile/Profile.jsx";
import { Product } from "./pages/Product/Product.jsx";
import { Orders } from "./pages/Orders/Orders.jsx";

import "./App.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="advertisements" element={<Advertisements />} />
      <Route path="advertisements/:id" element={<Product />} />
      <Route path="orders" element={<Orders />} />
      <Route path="profile" element={<Profile />} />
      <Route path="another-account" element={<AnotherAccount />} />
    </Route>
  )
);

export const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
