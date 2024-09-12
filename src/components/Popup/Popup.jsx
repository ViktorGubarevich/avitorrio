import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "../../api/axios";
import { CustomContext } from "../../context/context";

import "./popup.scss";

export const Popup = ({
  popup,
  setPopup,
  popupAdd,
  setPopupAdd,
  onClose,
  signal,
}) => {
  const { user, setUser } = useContext(CustomContext);
  const [status, setStatus] = useState("signIn");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const popUpCloseFunc = (e) => {
    if (e.target.classList.contains("overlay")) {
      if (popup) {
        setPopup(false);
      } else if (popupAdd) {
        setPopupAdd(false);
      }
    }
  };

  const signInHandler = (data) => {
    axios
      .post("/login", data, { signal })
      .then((res) => {
        setPopup(false);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        reset();
      })
      .catch(() => alert("Такого пользователя не существует!"));
  };

  const signUpHandler = (data) => {
    axios
      .post(
        "/users",
        {
          ...data,
          avatar: "",
          products: [],
        },
        { signal }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setPopup(false);
        reset();
      })
      .catch(() => alert("Данный пользователь уже существует!"));
  };

  const addPostHandler = (data) => {
    axios
      .post(
        "/advertisements",
        {
          ...data,
          creator: user,
        },
        { signal }
      )
      .then(() => {
        setPopupAdd(false);
        reset();
      })
      .catch((err) => alert(err));
  };

  return (
    <div
      onClick={(e) => popUpCloseFunc(e)}
      className={`overlay ${popup && "overlay-active"} ${
        popupAdd && "overlay-active"
      }`}
    >
      <div className="popup">
        {popup && (
          <form
            className="popup-form"
            onSubmit={
              status === "signIn"
                ? handleSubmit(signInHandler)
                : handleSubmit(signUpHandler)
            }
          >
            <div className="popup-form-top">
              <h2
                onClick={() => setStatus("signIn")}
                className={`popup-title ${
                  status === "signIn" && "popup-title-active"
                }`}
              >
                Войти
              </h2>
              <h2
                onClick={() => setStatus("signUp")}
                className={`popup-title ${
                  status === "signUp" && "popup-title-active"
                }`}
              >
                Регистрация
              </h2>
            </div>
            <input
              {...register("email")}
              className="popup-input"
              type="email"
              placeholder="Введите e-mail"
            />
            {status === "signUp" && (
              <input
                {...register("name")}
                className="popup-input"
                type="text"
                placeholder="Введите имя"
              />
            )}
            <input
              {...register("password", {
                pattern: {
                  value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                  message:
                    "Пароль должен содержать в себе минимум 8 символов, заглавную букву, число!",
                },
              })}
              className="popup-input"
              type="password"
              placeholder="Введите пароль"
            />
            <p className="popup-validation">{errors?.password?.message}</p>
            <button className="popup-btn" type="submit">
              {status === "signIn" ? "Войти" : "Регистрация"}
            </button>
          </form>
        )}
        {popupAdd && (
          <form className="popup-form" onSubmit={handleSubmit(addPostHandler)}>
            <input
              {...register("imageUrl")}
              className="popup-input"
              type="url"
              placeholder="Введите URL картинки"
            />
            <input
              {...register("name")}
              className="popup-input"
              type="text"
              placeholder="Введите название товара"
            />
            <input
              {...register("description")}
              className="popup-input"
              type="text"
              placeholder="Введите описание"
            />
            <input
              {...register("price")}
              className="popup-input"
              type="number"
              placeholder="Введите цену"
            />
            <div className="popup-btns">
              <button className="popup-btn" type="submit">
                Добавить объявление
              </button>
              <button onClick={onClose} className="popup-btn">
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
