import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import axios from "../../api/axios";
import { CustomContext } from "../../context/context";

import { ContainerLayout } from "../../components/Layout/ContainerLayout/ContainerLayout";
import { Navigation } from "../../components/Navigation/Navigation";
import { Pagination } from "../../components/Pagination/Pagination";
import { FormatDate } from "../../components/FormatDate/FormatDate";
import { LookOrders } from "../../components/LookOrders/LookOrders";

import "./orders.scss";

export const Orders = () => {
  const {
    orders,
    setOrders,
    getAllOrders,
    loading,
    filter,
    setFilter,
    signal,
  } = useContext(CustomContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");

  const numbersOrders = [
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
      .patch(
        `/orders/${data.id}`,
        {
          status: "Отменен",
        },
        { signal }
      )
      .then((res) => {
        const newOrders = orders.filter((order) => order.id !== data.id);

        setOrders([...newOrders, res.data]);
        alert("Заказ отменен успешно");
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Запрос был отменен");
        } else {
          console.error("Ошибка:", error);
        }
      });
  };

  const sortOrders = (order) => {
    let sortedOrders;

    if (order === "asc" || order === "desc") {
      sortedOrders = [...orders].sort((a, b) => {
        return order === "asc" ? a.total - b.total : b.total - a.total;
      });
    } else {
      sortedOrders = [...orders].filter((order) => order.status === order);
    }

    setOrders(sortedOrders);
  };

  const handleSortChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortOrders(newOrder);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

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
        <div className="crumbs">
          <NavLink className="crumbs-link" to="/">
            Главная
          </NavLink>
          - <p className="crumbs-noLink">Мои заказы</p>
        </div>
        <div className="content">
          <div className="orders-sort">
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
            <button
              className="order-btn"
              type="button"
              onClick={handleSortChange}
            >
              Сортировать:{" "}
              {sortOrder === "asc" ? "по возрастанию" : "по убыванию"}
            </button>
            <label htmlFor="statusSelect">Фильтр по статусу:</label>
            <select
              id="statusSelect"
              value={filter.status}
              onChange={(e) => {
                setFilter({ ...filter, status: e.target.value });
              }}
            >
              <option value="">Все</option>
              <option value="Получен">Получен</option>
              <option value="Ожидают оплаты">Ожидают оплаты</option>
              <option value="Отменен">Отменен</option>
            </select>
          </div>
          <ul className="orders-content">
            {currentOrders.map((item, index) => (
              <li key={item.id} className="order">
                <div className="order-data">
                  <div className="order-data-block">
                    <FormatDate
                      title="Дата заказа:"
                      createdAt={item.createdAt}
                    />
                    <p className="order-data-number">
                      Номер заказа: {numbersOrders[index]}
                    </p>
                    <h4>Статус заказа: {item.status}</h4>
                  </div>
                  <div className="order-data-block">
                    <h3>Стоимость заказа: {item.total} RUB</h3>
                    <p>Количество товаров: {item.items.length} ед</p>
                  </div>
                </div>
                <div className="order-buttons">
                  <LookOrders items={item.items} />
                  {item.status === "Ожидают оплаты" && (
                    <button
                      className="order-btn"
                      type="button"
                      onClick={() => handleCancelOrder(item)}
                    >
                      Отмена заказа
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {orders.length === 0 && <h2>Заказы с таким статусом отсутствуют!</h2>}
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
