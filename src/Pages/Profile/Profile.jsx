import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import axios from "../../api/axios";
import { CustomContext } from "../../context/context";

import { Navigation } from "../../components/Navigation/Navigation";
import { ContainerLayout } from "../../components/Layout/ContainerLayout/ContainerLayout";

import "./profile.scss";

export const Profile = () => {
  const { user, setUser } = useContext(CustomContext);

  const { handleSubmit, register } = useForm();

  const updateUser = (data) => {
    axios
      .patch(
        `/users/${user.id}`,
        {
          name: data.name.length ? data.name : user.name,
          email: data.email.length ? data.email : user.email,
          avatar: data.avatar.length ? data.avatar : user.avatar,
        },
        { signal }
      )
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Данные сохранены успешно!");
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Запрос был отменен");
        } else {
          console.error("Ошибка:", error);
        }
      });
  };

  return (
    <ContainerLayout>
      <Navigation />

      <div className="profile-content">
        <div className="crumbs">
          <NavLink className="crumbs-link" to="/">
            Главная
          </NavLink>{" "}
          -<p className="crumbs-noLink">Мой профиль</p>
        </div>
        <form onSubmit={handleSubmit(updateUser)}>
          <h2 className="profile-title">Фото профиля</h2>
          <div className="profile-user">
            <img
              className="profile-img"
              src={
                user.avatar
                  ? user.avatar
                  : "https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png"
              }
              alt={user.name}
            />
            <input
              {...register("avatar")}
              className="profile-input"
              type="url"
              defaultValue={user.avatar}
              placeholder="Ссылка на картинку"
            />
          </div>
          <p className="profile-info">Максимальный размер фото 5 МБ</p>
          <h3 className="profile-title">Личная информация</h3>
          <p className="profile-title">Мое имя</p>
          <input
            {...register("name")}
            defaultValue={user.name}
            className="profile-input"
            placeholder="Введите имя"
            type="text"
          />
          <p className="profile-title">Email</p>
          <input
            {...register("email")}
            defaultValue={user.email}
            className="profile-input"
            placeholder="Введите e-mail"
            type="email"
          />
          <button type="submit" className="profile-btn2">
            Сохранить
          </button>
        </form>
      </div>
    </ContainerLayout>
  );
};
