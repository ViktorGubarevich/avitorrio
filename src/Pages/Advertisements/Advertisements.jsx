import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import debounce from "lodash.debounce";

import { CustomContext } from "../../context/context";

import { ContainerLayout } from "../../components/Layout/ContainerLayout/ContainerLayout";
import { Pagination } from "../../components/Pagination/Pagination";
import { Navigation } from "../../components/Navigation/Navigation";

import { FaEye } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import { GrSearch } from "react-icons/gr";

import "./advertisements.scss";

export const Advertisements = () => {
  const {
    advertisements,
    getAllAdvertisements,
    loading,
    filter,
    setFilter,
  } = useContext(CustomContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const lastAdvertisementsIndex = currentPage * postsPerPage;
  const firstAdvertisementsIndex = lastAdvertisementsIndex - postsPerPage;
  const currentAdvertisements =
    advertisements < postsPerPage
      ? advertisements.slice(0)
      : advertisements.slice(firstAdvertisementsIndex, lastAdvertisementsIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event) => {
    setPostsPerPage(Number(event.target.value));
  };

  useEffect(() => {
    getAllAdvertisements();
  }, []);

  const searchAdvertisements = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };

  const searchPriceAFromdvertisements = (e) => {
    setFilter({
      ...filter,
      price: { ...filter.price, from: +e.target.value },
    });
  };

  const debounceFunc = debounce(searchAdvertisements, 800);
  const debouncePriceFrom = debounce(searchPriceAFromdvertisements, 800);

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

      <ul className="advertisements">
        <div className="advertisements-content">
          <div className="crumbs">
            <NavLink className="crumbs-link" to="/">
              Главная
            </NavLink>
            - <p className="crumbs-noLink">Мои объявления</p>
          </div>
          <div className="category">
            <div className="category-head">
              <div className="category-search">
                <p className="category-title">Поиск</p>
                <input
                  className="category-input"
                  type="text"
                  placeholder="Я ищу..."
                  onChange={debounceFunc}
                />
                <p className="category-icon">
                  <GrSearch />
                </p>
              </div>
              <div className="category-price">
                <p className="category-title">Цена</p>
                <div className="category-inputs">
                  <input
                    className="category-second-input"
                    type="number"
                    placeholder="Цена от"
                    onChange={debouncePriceFrom}
                  />
                </div>
              </div>
            </div>
          </div>
          <>
            <label>Показывать объявлений на странице: </label>
            <select
              className="advertisements-size"
              value={postsPerPage}
              onChange={handleChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </>
          <ul className="advertisements-cards">
            {currentAdvertisements
              .filter((el) => el.price > +filter?.price?.from)
              .map((item) => (
                <li key={item.id} className="advertisement-card">
                  <NavLink
                    className="advertisement-card-link"
                    to={`/advertisements/${item.id}`}
                  >
                    <img
                      className="advertisement-card-img"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                    <h2 className="advertisement-card-title">{item.name}</h2>
                    <p className="advertisement-card-price">
                      {item.price ? `${item.price} RUB` : ""}
                    </p>
                    <div className="advertisement-card-descr">
                      {item.description}
                    </div>
                    <div className="product-content-uses advertisement">
                      <div className="product-content-views">
                        <FaEye />
                        {item.views ? item.views : 0}
                      </div>
                      <div className="product-content-likes">
                        <AiTwotoneLike />
                        {item.likes ? item.likes : 0}
                      </div>
                    </div>
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </ul>
      <Pagination
        postsPerPage={postsPerPage}
        totalAdvertisements={advertisements.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </ContainerLayout>
  );
};
