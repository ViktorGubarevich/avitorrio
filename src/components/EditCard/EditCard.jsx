import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import axios from "../../api/axios";
import { CustomContext } from "../../context/context";

import "./edit-card.scss";

export const EditCard = ({ onClose }) => {
  const { advertisement, setAdvertisement } = useContext(CustomContext);

  const params = useParams();
  const { register, handleSubmit } = useForm();

  const changePostHandler = (data) => {
    axios
      .patch(`/advertisements/${advertisement.id}`, {
        imageUrl: data.imageUrl.length ? data.imageUrl : advertisement.imageUrl,
        name: data.name.length ? data.name : advertisement.name,
        description: data.description.length
          ? data.description
          : advertisement.description,
        price: data.price.length ? data.price : advertisement.price,
      })
      .then((res) => {
        setAdvertisement(res.data);
        onClose();
        alert("Данные сохранены успешно!");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="overlay overlay-active">
      <div className="popup">
        <form className="popup-form" onSubmit={handleSubmit(changePostHandler)}>
          <label htmlFor="imageUrl">Изображение:</label>
          <input
            {...register("imageUrl")}
            defaultValue={advertisement.imageUrl}
            className="popup-input edit"
            type="url"
            id="image"
            name="imageUrl"
          />

          <label htmlFor="name">Название:</label>
          <input
            {...register("name")}
            defaultValue={advertisement.name}
            className="popup-input edit"
            type="text"
            id="title"
            name="name"
          />

          <label htmlFor="description">Описание:</label>
          <input
            {...register("description")}
            defaultValue={advertisement.description}
            className="popup-input edit"
            type="text"
            id="description"
            name="description"
          ></input>

          <label htmlFor="price">Цена:</label>
          <input
            {...register("price")}
            defaultValue={advertisement.price}
            className="popup-input edit"
            type="number"
            id="price"
            name="price"
          />

          <div className="edit-btns">
            <button type="submit" className="edit-btn">
              Сохранить
            </button>
            <button onClick={onClose} className="edit-btn">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
