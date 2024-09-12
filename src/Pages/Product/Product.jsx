import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import axios from "../../api/axios";
import { CustomContext } from "../../context/context";

import { ContainerLayout } from "../../components/Layout/ContainerLayout/ContainerLayout";
import { EditCard } from "../../components/EditCard/EditCard";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { Navigation } from "../../components/Navigation/Navigation";

import { FaEye } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";

import "./product.scss";

export const Product = () => {
  const { advertisement, setAdvertisement } = useContext(CustomContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const params = useParams();

  const openEditForm = () => {
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  useEffect(() => {
    axios
      .get(`/advertisements/${params.id}`, { signal })
      .then(({ data }) => {
        setAdvertisement(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Запрос был отменен");
        } else {
          console.error("Ошибка:", error);
        }
      });
  }, []);

  return (
    <ContainerLayout>
      <Navigation />
      <div className="product">
        <div className="crumbs">
          <NavLink className="crumbs-link" to="/advertisements">
            Мои объявления
          </NavLink>
          - <p className="crumbs-noLink">Продукт</p>
        </div>
        <div className="product-content">
          <div className="product-content-left">
            <img
              className="product-content-img"
              src={advertisement.imageUrl}
              alt={advertisement.name}
            />
            <div className="product-content-uses">
              <div className="product-content-views">
                <FaEye />
                {advertisement.views ? advertisement.views : 0}
              </div>
              <div className="product-content-likes">
                <AiTwotoneLike />
                {advertisement.likes ? advertisement.likes : 0}
              </div>
            </div>
          </div>
          <div className="product-content-right">
            <h2 className="content-title">{advertisement.name}</h2>
            <p className="product-content-descr">{advertisement.description}</p>
            <p className="content-price">{advertisement.price} RUB</p>
            <button
              className="product-content-change-btn"
              type="button"
              onClick={openEditForm}
            >
              Редактировать объявление
            </button>
            {showEditForm && <EditCard onClose={closeEditForm} />}

            <PreviewCard
              src={advertisement.imageUrl}
              name={advertisement.name}
              description={advertisement.description}
              price={advertisement.price}
            />
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};
