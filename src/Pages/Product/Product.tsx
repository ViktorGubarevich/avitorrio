import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import axios from "../../axios";
import { CustomContext } from "../../Context";

import { ContainerLayout } from "../../components/Layout/ContainerLayout/ContainerLayout";
import { EditCard } from "../../components/EditCard/EditCard";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { Navigation } from "../../components/Navigation/Navigation";

import { FaEye } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
// import { FaUserAlt } from "react-icons/fa";

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
    axios.get(`/advertisements/${params.id}`).then(({ data }) => {
      setAdvertisement(data);
    });
  }, []);

  return (
    <ContainerLayout>
      <Navigation />
      <div className="product">
        <div className="product-crumbs">
          <NavLink className="product-crumbs-link" to="/advertisements">
            Advertisements
          </NavLink>
          - <p className="product-crumbs-noLink">Product</p>
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
            <h2 className="product-content-title">{advertisement.name}</h2>
            <p className="product-content-descr">{advertisement.description}</p>
            <p className="product-content-price">{advertisement.price} RUB</p>
            {/* <div className="product-content-user">
              <FaUserAlt />
              {advertisement.creator ? (
                <p className="product-content-userName">
                  {advertisement.creator.name}
                </p>
              ) : (
                "No name"
              )}
            </div> */}
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
