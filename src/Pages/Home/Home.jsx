import { useContext } from "react";

import { ContainerLayout } from "../../components/Layout/ContainerLayout/ContainerLayout";
import { CustomContext } from "../../context/context";

import "./home.scss";

export const Home = () => {
  const { user } = useContext(CustomContext);

  return (
    <ContainerLayout className="homepage">
      <div className="homepage-title">
        Добро пожаловать на платформу {user ? user.name : " "}
      </div>
      <div>
        В личном кабинете, вы cможете ознакомиться со своими объявлениями и
        заказами!
      </div>
    </ContainerLayout>
  );
};
