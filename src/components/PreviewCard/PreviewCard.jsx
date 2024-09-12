import { useState } from "react";

import "./preview.scss";

export const PreviewCard = ({ src, name, description, price }) => {
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
        Предпросмотр
      </button>
      {preview && (
        <div className="preview">
          <div className="product-content">
            <div className="product-content-left">
              <img className="product-content-img" src={src} alt={name} />
            </div>
            <div className="product-content-right">
              <h2 className="content-title">{name}</h2>
              <p className="product-content-descr">{description}</p>
              <p className="content-price">{price} RUB</p>
            </div>
          </div>

          <button className="preview-btn" type="button" onClick={closePreview}>
            Закрыть
          </button>
        </div>
      )}
    </>
  );
};
