import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { ContainerLayout } from "../Layout/ContainerLayout/ContainerLayout";
import { Popup } from "../Popup/Popup";
import { CustomContext } from "../../context/context";

import "./header.scss";

export const Header = () => {
  const { user, setUser } = useContext(CustomContext);

  const [popup, setPopup] = useState(false);
  const [popupAdd, setPopupAdd] = useState(false);

  const logOutUser = () => {
    localStorage.removeItem("user");
    setUser({});
  };

  const closeForm = () => {
    setPopup(false);
  };

  return (
    <ContainerLayout className="header">
      <nav className="header-nav">
        <h1 className="header-title">
          <Link to="/">AVITORRIO</Link>
        </h1>
        <div className="header-right">
          {user.email ? (
            <div className="header-user">
              <p className="header-user-wallet">Кошелек: {user.balance} RUB</p>
              {user.avatar ? (
                <img
                  className="header-user-avatar"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <img
                  className="header-user-avatar"
                  src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                  alt={user.name}
                />
              )}
              <NavLink to="/advertisements" className="header-user-name">
                {user.name}
              </NavLink>
              <NavLink to="/">
                <button
                  className="header-user-btn"
                  type="button"
                  onClick={() => logOutUser()}
                >
                  Выйти
                </button>
              </NavLink>
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
      {popup && <Popup setPopup={setPopup} popup={popup} />}
      {popupAdd && (
        <Popup
          setPopupAdd={setPopupAdd}
          popupAdd={popupAdd}
          onClose={closeForm}
        />
      )}
    </ContainerLayout>
  );
};
