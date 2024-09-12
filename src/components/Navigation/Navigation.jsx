import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { ContainerLayout } from "../Layout/ContainerLayout/ContainerLayout";

import "./navigation.scss";

export const Navigation = () => (
  <ContainerLayout className="navigation">
    <ul className="tabs">
      <li key={uuidv4()}>
        <NavLink className="link" to="/advertisements">
          Мои объявления
        </NavLink>
      </li>
      <li key={uuidv4()}>
        <NavLink className="link" to="/orders">
          Мои заказы
        </NavLink>
      </li>
      <li key={uuidv4()}>
        <NavLink className="link" to="/profile">
          Настройка профиля
        </NavLink>
      </li>
    </ul>
  </ContainerLayout>
);
