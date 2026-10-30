import React from "react";
import ProductSchema from "../components/ProductSchema";

const product = {
  name: "დღის ზურგჩანთა 20L",
  image: "/bagyellow.jpg",
  price: "89.00",
  currency: "GEL",
  inStock: true,
};

function Product() {
  return (
    <div>
      <ProductSchema product={product} />
      <p>{product.name}</p>
      <img src={product.image} alt={product.name} />
      <span>{product.price}</span>
      <span>{product.currency}</span>
      <span>{product.inStock ? "In stock" : "Out of stock"}</span>
    </div>
  );
}

export default Product;
