import { createContext, useEffect, useState } from "react";

import axios from "./axios";

export const CustomContext = createContext();

export const Context = ({ children }) => {
  const [user, setUser] = useState({});
  const [advertisement, setAdvertisement] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  };

  useEffect(() => {
    const getAllOrders = async () => {
      setLoading(true);

      const res = await axios.get("/orders");
      setOrders(res.data);
      setLoading(false);
    };

    getAllOrders();
  }, []);

  const value = {
    user,
    setUser,
    getUserFromLocalStorage,
    advertisement,
    setAdvertisement,
    orders,
    setOrders,
    loading,
  };

  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  );
};
