import React from "react";


import products from "./products.json";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";


export default function Home() {
  const {
    count,
    notify,
    showPopUp,
    openPopUp,
    closePopUp,
    cartItems,
    handleAddToCart,
  } = useContext(CartContext);

  return (
    <>
      
      <div className="mainWrapper">
        <div className="container sm:max-w-full mx-auto px-4">
          <div className="flex flex-wrap">
            {products.map((singleProduct) => {
              const cartItem = cartItems.find(
                (item) => item.id === singleProduct.id,
              );
              const isOutOfStock = cartItem?.quantity >= singleProduct.stockQty;
              return (
                <div key={singleProduct.id} className="product-row max-[1023px]:!w-[50%] max-[600px]:!w-full">
                  <div className="box">
                    <div className="imgWrapper p-3">
                      <img src={singleProduct.image} alt="Hero" className="img-fluid" />
                    </div>
                    <div className="details p-3">
                      <h3>{singleProduct.name}</h3>
                      <p>{singleProduct.description}</p>
                      <p>Price: ₹{singleProduct.price}</p>
                      <p>Stock Qty: {singleProduct.stockQty}</p>
                      <button
                        className={`btn ${isOutOfStock ? "disable" : ""}`}
                        disabled={isOutOfStock}
                        onClick={() => {
                          handleAddToCart(singleProduct);
                          notify();
                        }}
                      >
                        {isOutOfStock ? "Out of stock" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
