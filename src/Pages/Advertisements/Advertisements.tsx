import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import axios from "../../axios";
import { ContainerLayout } from "../../components/Layout/ContainerLayout/ContainerLayout";

import { Pagination } from "../../components/Pagination/Pagination";
import { Navigation } from "../../components/Navigation/Navigation";
import { GrSearch } from "react-icons/gr";

import "./advertisements.scss";

export const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
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
    const getAllAdvertisements = async () => {
      setLoading(true);

      const res = await axios.get("/advertisements");
      setAdvertisements(res.data);
      setLoading(false);
    };

    getAllAdvertisements();
  }, []);

  console.log(currentAdvertisements);

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

      <ul className="home">
        <div className="home-content">
          <div className="product-crumbs">
            <NavLink className="product-crumbs-link" to="/">
              Home
            </NavLink>
            - <p className="product-crumbs-noLink">Advertisements</p>
          </div>
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
          <ul className="home-cards">
            {currentAdvertisements.map((item) => (
              <li className="home-card">
                <NavLink
                  className="home-card-link"
                  to={`/advertisements/${item.id}`}
                >
                  <img
                    className="home-card-img"
                    src={item.imageUrl}
                    alt={item.name}
                  />
                  <h2 className="home-card-title">{item.name}</h2>
                  <p className="home-card-price">
                    {item.price ? `${item.price} RUB` : ""}
                  </p>
                  <div className="home-card-descr">{item.description}</div>
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
