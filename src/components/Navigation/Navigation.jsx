import { NavLink } from "react-router-dom";

import { ContainerLayout } from "../Layout/ContainerLayout/ContainerLayout";

import "./navigation.scss";

export const Navigation = () => (
  <ContainerLayout className="navigation">
    <ul className="tabs">
      <li>
        <NavLink className="link" to="/advertisements">
          Мои объявления
        </NavLink>
      </li>
      <li>
        <NavLink className="link" to="/orders">
          Мои заказы
        </NavLink>
      </li>
      <li>
        <NavLink className="link" to="/profile">
          Настройка профиля
        </NavLink>
      </li>
    </ul>
  </ContainerLayout>
);
