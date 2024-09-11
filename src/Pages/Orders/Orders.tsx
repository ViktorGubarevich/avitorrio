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

import "./orders.scss";
import { GrSearch } from "react-icons/gr";
import { Pagination } from "../../components/Pagination/Pagination";
import { FormatDate } from "../../components/FormatDate/FormatDate";

export const Orders = () => {
  const { orders, setOrders, loading } = useContext(CustomContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [status, setStatus] = useState("Ожидают оплаты");

  const fourDigitNumbers = [
    3456,
    7891,
    2345,
    6789,
    1234,
    5678,
    9876,
    4567,
    8901,
    2310,
  ];

  const lastOrdersIndex = currentPage * postsPerPage;
  const firstOrdersIndex = lastOrdersIndex - postsPerPage;
  const currentOrders =
    orders < postsPerPage
      ? orders.slice(0)
      : orders.slice(firstOrdersIndex, lastOrdersIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event) => {
    setPostsPerPage(Number(event.target.value));
  };

  const handleCancelOrder = (data) => {
    axios
      .patch(`/orders/${orders.id}`, {
        status: data.status,
      })
      .then((res) => {
        setOrders(res.data);
        alert("Заказ отменен успешно");
      })
      .catch((err) => alert(err));
  };

  //   const params = useParams();

  //   const openEditForm = () => {
  //     setShowEditForm(true);
  //   };

  //   const closeEditForm = () => {
  //     setShowEditForm(false);
  //   };

  if (loading) {
    return (
      <ContainerLayout>
        <h2 className="loading">Loading...</h2>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      <Navigation />
      <div className="orders">
        <div className="product-crumbs">
          <NavLink className="product-crumbs-link" to="/">
            Home
          </NavLink>
          - <p className="product-crumbs-noLink">Orders</p>
        </div>
        <div className="content">
          <div className="category">
            <div className="category-head">
              <div className="category-search">
                <input
                  className="category-input"
                  type="text"
                  placeholder="Я ищу..."
                />
                <p className="category-icon">
                  <GrSearch />
                </p>
              </div>
              <select className="category-select" name="" id="">
                <option value="">Сортировать по</option>
                <option value="">Лайкам</option>
                <option value="">Просмотрам</option>
              </select>
            </div>
            <div className="category-content">
              <div className="category-price">
                <p className="category-title">Цена</p>
                <div className="category-inputs">
                  <input
                    className="category-second-input"
                    type="number"
                    placeholder="Цена от"
                  />
                  <input
                    className="category-second-input"
                    type="number"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="category-sort">
                <p className="category-title">Cортировать</p>
                <select className="category-select sort" name="" id="">
                  <option value="">По умолчанию</option>
                  <option value="">По сумме заказа</option>
                </select>
              </div>
            </div>
            <div className="btn">
              <button className="category-btn">Показать</button>
            </div>
          </div>
          <>
            <label>Показывать объявлений на странице: </label>
            <select
              className="advertisement-size"
              value={postsPerPage}
              onChange={handleChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </>
          <ul className="orders-content">
            {currentOrders.map((item, index) => (
              <li className="order">
                <NavLink to="#">
                  <div className="order-data">
                    <div className="order-data-block">
                      <FormatDate createdAt={item.createdAt} />
                      <p className="order-data-number">
                        {fourDigitNumbers[index]}
                      </p>
                      <h4>{item.status}</h4>
                    </div>
                    <div className="order-data-block">
                      <h3>Стоимость заказа: {item.total} RUB</h3>
                      <p>Количество товаров: {item.items.length} ед</p>
                    </div>
                  </div>
                  <div className="order-buttons">
                    <button className="order-btn" type="button">
                      Показать все товары
                    </button>
                    <button
                      className="order-btn"
                      type="button"
                      onClick={handleCancelOrder}
                    >
                      Отмена заказа
                    </button>
                  </div>

                  {/* <img
                    className="home-card-img"
                    src={item.imageUrl}
                    alt={item.name}
                  />
                  <h2 className="home-card-title">{item.name}</h2>
                  <p className="home-card-price">
                    {item.price ? `${item.price} RUB` : ""}
                  </p>
                  <div className="home-card-descr">{item.description}</div> */}
                </NavLink>
              </li>
            ))}
          </ul>
          <Pagination
            postsPerPage={postsPerPage}
            totalAdvertisements={orders.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </ContainerLayout>
  );
};
