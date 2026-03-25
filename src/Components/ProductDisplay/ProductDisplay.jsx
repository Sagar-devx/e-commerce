import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  // Selected size state
  const [selectedSize, setSelectedSize] = useState("");

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt="Product"
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star-dull" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            Rs {product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            Rs {product.new_price}
          </div>
        </div>

        <div className="productdisplay-right-description">
          A lightweight, knitted, pullover shirt with round neckline and short
          sleeves, worn as an undershirt or outer garment.
        </div>

        {/* ---- SIZE SELECTION ---- */}
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>

          <div className="productdisplay-right-sizes">
            {sizes.map((size) => (
              <div
                key={size}
                className={`size-box ${
                  selectedSize === size ? "active-size" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => addToCart(product.id)}>
          Add To Cart
        </button>

        <p className="productdisplay-right-category">
          <span>Category:</span> Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;