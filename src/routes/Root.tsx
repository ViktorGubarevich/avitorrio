import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";

import { CustomContext } from "../Context";
import { Header } from "../components/Header/Header";
import { MainLayout } from "../components/Layout/MainLayout/MainLayout";
import { Footer } from "../components/Footer/Footer";

export const Root = () => {
  const { getUserFromLocalStorage } = useContext(CustomContext);

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  return (
    <>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Footer />
    </>
  );
};
