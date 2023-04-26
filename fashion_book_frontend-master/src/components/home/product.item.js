import React from "react";
import { Link } from "react-router-dom";
const ProductItem = ({ urlImg, price, name, id, book }) => (
  <div className="col-lg-4 col-md-4 col-sm-6">
    <div className="product-image-wrapper">
      <div className="single-products">
        <div className="productinfo text-center product_home-item">
          <Link to={"/product/" + id}>
            <img src={urlImg} alt="" />
          </Link>
          <h4 className="name-product name-product-home">{name}</h4>
          <div className="product-content product-cont-item">
            <div class="bestselling__product-rate-wrap">
              <i class="fas fa-star bestselling__product-rate"></i>
              <i class="fas fa-star bestselling__product-rate"></i>
              <i class="fas fa-star bestselling__product-rate"></i>
              <i class="fas fa-star bestselling__product-rate"></i>
              <i class="fas fa-star bestselling__product-rate"></i>
            </div>
            <Link to={"/product/" + id}>
              <h2 className="price-product-home">
                {new Intl.NumberFormat("de-DE", { currency: "EUR" }).format(
                  price
                )}
                <sup>đ</sup>
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default ProductItem;
