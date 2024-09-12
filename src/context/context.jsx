import { createContext, ReactNode, useEffect, useState } from "react";

import axios from "../api/axios";

export const CustomContext = createContext();

export const Context = ({ children }) => {
  const [user, setUser] = useState({});
  const [advertisements, setAdvertisements] = useState([]);
  const [advertisement, setAdvertisement] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    likes: "",
    name: "",
    price: {
      from: 0,
    },
  });

  const restoreUserFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  };

  const getAllAdvertisements = (filter) => {
    setLoading(true);

    axios
      .get(
        `/advertisements?${
          filter?.likes?.length ? `likes=${filter.likes}` : ""
        }${filter?.name?.length ? `&name=${filter.name}` : ""}`
      )
      .then((res) => {
        setAdvertisements(res.data);
        setLoading(false);
      });
  };

  const getAllOrders = (filter) => {
    setLoading(true);

    axios
      .get(`/orders?${filter?.status?.length ? `status=${filter.status}` : ""}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllAdvertisements(filter);
    getAllOrders(filter);
  }, [filter]);

  const value = {
    user,
    setUser,
    restoreUserFromLocalStorage,
    advertisement,
    setAdvertisement,
    orders,
    setOrders,
    loading,
    advertisements,
    setAdvertisements,
    getAllAdvertisements,
    getAllOrders,
    filter,
    setFilter,
  };

  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  );
};
