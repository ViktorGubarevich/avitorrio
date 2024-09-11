import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { ContainerLayout } from "../Layout/ContainerLayout/ContainerLayout";

import { Popup } from "../Popup/Popup";

import "./header.scss";

import { MenuCatalog } from "../MenuCatalog/MenuCatalog";
import { MenuListArray } from "../../list";
import { CustomContext } from "../../Context";

export const Header = () => {
  const { user, setUser } = useContext(CustomContext);
  const [popup, setPopup] = useState(false);
  const [popupAdd, setPopupAdd] = useState(false);

  const logOutUser = () => {
    localStorage.removeItem("user");
    setUser({});
  };

  return (
    <header className="header">
      <ContainerLayout>
        <nav className="header-nav">
          <h1 className="header-title">
            <Link to="/">AVITORRIO</Link>
          </h1>
          <div className="header-right">
            {user.email ? (
              <div className="header-user">
                <p className="header-user-wallet">
                  Кошелек: {user.balance} RUB
                </p>
                <img
                  className="header-user-avatar"
                  src={user.avatar}
                  alt={user.name}
                />
                <NavLink to="/advertisements" className="header-user-name">
                  {user.name}
                </NavLink>
                <button
                  className="header-user-btn"
                  type="button"
                  onClick={() => logOutUser()}
                >
                  Выйти
                </button>
                <button
                  className="header-btn"
                  type="button"
                  onClick={() => setPopupAdd(true)}
                >
                  Подать объявление
                </button>
              </div>
            ) : (
              <p className="header-login" onClick={() => setPopup(true)}>
                Войти - Регистрация
              </p>
            )}
          </div>
        </nav>
      </ContainerLayout>
      {popup && <Popup setPopup={setPopup} popup={popup} />}
      {popupAdd && <Popup setPopupAdd={setPopupAdd} popupAdd={popupAdd} />}
      <div className="header-bottom">
        <ContainerLayout>
          <div className="header-bottom-search">
            <input
              className="header-bottom-input"
              type="search"
              placeholder="Поиск..."
            />
            <button className="header-bottom-icon">
              <BsSearch />
            </button>
          </div>
          <ul className="header-bottom-list">
            {MenuListArray.map((item) => (
              <MenuCatalog {...item} className="header-bottom-item">
                <NavLink className="header-bottom-link" to="#">
                  <div className="header-bottom-circle">{item.icon}</div>
                  <p className="header-bottom-title">{item.title}</p>
                </NavLink>
              </MenuCatalog>
            ))}
          </ul>
        </ContainerLayout>
      </div>
    </header>
  );
};
