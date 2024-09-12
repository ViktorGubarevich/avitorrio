import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";

import { CustomContext } from "../context/context";

import { Header } from "../components/Header/Header";
import { MainLayout } from "../components/Layout/MainLayout/MainLayout";

export const Root = () => {
  const { restoreUserFromLocalStorage } = useContext(CustomContext);

  useEffect(() => {
    restoreUserFromLocalStorage();
  }, []);

  return (
    <>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};
