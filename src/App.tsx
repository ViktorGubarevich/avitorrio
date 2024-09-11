import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Root } from "./routes/Root.tsx";
import { Advertisements } from "./Pages/Advertisements/Advertisements.tsx";

import { Home } from "./Pages/Home/Home.tsx";
import { AnotherAccount } from "./Pages/AnotherAccount/AnotherAccount.tsx";
import { Profile } from "./Pages/Profile/Profile.tsx";
import { Product } from "./Pages/Product/Product.tsx";

import "./App.scss";
import { Orders } from "./Pages/Orders/Orders.tsx";

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
