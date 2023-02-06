import { Card } from "antd";
import React, { useState } from "react";
import "./styles.scss";

function ImageSlider({ images }: any) {
  const [imgSrc, setImgSrc] = useState(images[0].url);
  const changeImgShow = (url: string) => {
    setImgSrc(url);
  };
  return (
    <div className="imgs-slider">
      <div className="img-show">
        <div className="div-img-show">
          <img src={imgSrc} className="mb-3 card-image fix-img-show" />
        </div>
        <div className="img-option">
          {images.map((img: any) => (
            <div className="border-img-option mb-3">
              <img
                src={img.url}
                key={img.public_id}
                className=" card-image"
                onClick={() => changeImgShow(img.url)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
