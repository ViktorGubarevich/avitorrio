import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import { ContainerLayout } from "../../components/Layout/ContainerLayout/ContainerLayout";
import { CustomContext } from "../../Context";
import axios from "../../axios";

import { IoTrashOutline } from "react-icons/io5";

import "./profile.scss";
import { Navigation } from "../../components/Navigation/Navigation";

export const Profile = () => {
  const { user, setUser } = useContext(CustomContext);

  const { handleSubmit, register } = useForm();

  const updateUser = (data) => {
    axios
      .patch(`/users/${user.id}`, {
        name: data.name.length ? data.name : user.name,
        email: data.email.length ? data.email : user.email,
        avatar: data.avatar.length ? data.avatar : user.avatar,
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Данные сохранены успешно!");
      });
  };

  return (
    <ContainerLayout>
      <Navigation />

      <div className="profile-content">
        <div className="product-crumbs">
          <NavLink to="/">Home</NavLink> -
          <p className="product-crumbs-noLink">Profile</p>
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
            <p className="profile-icon">
              <IoTrashOutline />
            </p>
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
        <h3 className="profile-title">Изменение пароля</h3>
        <p className="profile-title">Текущий пароль</p>
        <input
          className="profile-input"
          placeholder="Текущий пароль"
          type="password"
        />
        <p className="profile-title">Новый пароль</p>
        <input
          className="profile-input"
          placeholder="Новый пароль"
          type="password"
        />
        <p className="profile-title">Подтвердите пароль</p>
        <input
          className="profile-input"
          placeholder="Подтвердите пароль"
          type="password"
        />
        <button className="profile-btn2">Сохранить</button>
        <h3 className="profile-title">Удаление профиля</h3>
        <p className="profile-remove">
          <span className="profile-remove-item">
            <IoTrashOutline />
          </span>
          Удалить профиль
        </p>
      </div>
    </ContainerLayout>
  );
};
