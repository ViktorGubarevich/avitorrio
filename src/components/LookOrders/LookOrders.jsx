import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./look-orders.scss";

export const LookOrders = ({ items }) => {
  const [preview, setPreview] = useState(false);

  const handlePreview = () => {
    setPreview(true);
  };

  const closePreview = () => {
    setPreview(false);
  };

  return (
    <>
      <button className="preview-btn" type="button" onClick={handlePreview}>
        Показать все товары
      </button>
      {preview ? (
        <div className="preview">
          <ul className="items-content">
            {items.map((item) => (
              <li key={uuidv4()} className="item-content">
                <div className="item-content-left">
                  {item.imageUrl && (
                    <img
                      className="item-content-img"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  )}
                </div>
                <div className="item-content-right">
                  <h3 className="content-title">{item.name}</h3>
                  <p className="content-price">{item.price} RUB</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="btn">
            <button
              className="preview-btn"
              type="button"
              onClick={closePreview}
            >
              Закрыть
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
