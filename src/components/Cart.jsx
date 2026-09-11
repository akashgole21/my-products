import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const handleCheckout = (e) => {
    e.preventDefault();
    closePopUp();
    navigate("/checkout");
  };

  const {
    count,
    showPopUp,
    openPopUp,
    closePopUp,
    cartItems,
    totalPrice,
    handleIncrease,
    handleDecrease,
    handleRemoveItem,
    handleClearCart,
  } = useContext(CartContext);

  return (
    <>
      <div className="cartBtn">
        <a href="#cart" onClick={openPopUp}>
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M740 854C740 883 763 906 792 906S844 883 844 854 820 802 792 802 740 825 740 854ZM217 156H958C977 156 992 173 989 191L957 452C950 509 901 552 843 552H297L303 581C311 625 350 656 395 656H875C892 656 906 670 906 687S892 719 875 719H394C320 719 255 666 241 593L141 94H42C25 94 10 80 10 62S25 31 42 31H167C182 31 195 42 198 56L217 156ZM230 219L284 490H843C869 490 891 470 895 444L923 219H230ZM677 854C677 791 728 740 792 740S906 791 906 854 855 969 792 969 677 918 677 854ZM260 854C260 791 312 740 375 740S490 791 490 854 438 969 375 969 260 918 260 854ZM323 854C323 883 346 906 375 906S427 883 427 854 404 802 375 802 323 825 323 854Z"></path>
          </svg>
        </a>
        <span className="product-count">{count}</span>
      </div>
      <div
        className={`cartPopup ${showPopUp ? "popup-open" : ""}`}
        style={{
          opacity: showPopUp ? "1" : "0",
          visibility: showPopUp ? "visible" : "hidden",
        }}
      >
        <div className="cartOverlay">
          <div className="cartContent">
            <div className="container mx-auto">
              <div className="flex flex-wrap">
                <a className="close-btn" onClick={closePopUp}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      fill="#000"
                      d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"
                    ></path>
                  </svg>
                </a>
                <div className="col-md-12">
                  <div className="cartHeader">
                  <h2>My Cart</h2>
                  {cartItems.length === 0 && <h4>Cart is empty</h4>}
                  </div>

                  {cartItems.length >= 1 && (
                    <ul className="cart-lists">
                      {cartItems.map((cartItem) => {
                        return (
                          <li key={cartItem.id}>
                            <span className="cartProductName">
                              {cartItem.name}
                            </span>
                            
                            <span className="quantity">
                              <span className="qnt-wrapper">
                                <button
                                  className="item-decrease"
                                  onClick={() => handleDecrease(cartItem)}
                                >
                                  -
                                </button>
                                <span>{cartItem.quantity}</span>
                                <button
                                  className="item-increase"
                                  onClick={() => handleIncrease(cartItem)}
                                >
                                  +
                                </button>
                              </span>
                            </span>

                            <span className="price">
                              Price: ₹{cartItem.price * cartItem.quantity}
                            </span>

                            <button
                              className="item-remove"
                              onClick={() => handleRemoveItem(cartItem)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="100"
                                height="100"
                                viewBox="0 0 50 50"
                              >
                                <path d="M 42 5 L 32 5 L 32 3 C 32 1.347656 30.652344 0 29 0 L 21 0 C 19.347656 0 18 1.347656 18 3 L 18 5 L 8 5 C 7.449219 5 7 5.449219 7 6 C 7 6.550781 7.449219 7 8 7 L 9.085938 7 L 12.695313 47.515625 C 12.820313 48.90625 14.003906 50 15.390625 50 L 34.605469 50 C 35.992188 50 37.175781 48.90625 37.300781 47.515625 L 40.914063 7 L 42 7 C 42.554688 7 43 6.550781 43 6 C 43 5.449219 42.554688 5 42 5 Z M 20 44 C 20 44.554688 19.550781 45 19 45 C 18.449219 45 18 44.554688 18 44 L 18 11 C 18 10.449219 18.449219 10 19 10 C 19.550781 10 20 10.449219 20 11 Z M 20 3 C 20 2.449219 20.449219 2 21 2 L 29 2 C 29.550781 2 30 2.449219 30 3 L 30 5 L 20 5 Z M 26 44 C 26 44.554688 25.550781 45 25 45 C 24.449219 45 24 44.554688 24 44 L 24 11 C 24 10.449219 24.449219 10 25 10 C 25.550781 10 26 10.449219 26 11 Z M 32 44 C 32 44.554688 31.554688 45 31 45 C 30.445313 45 30 44.554688 30 44 L 30 11 C 30 10.449219 30.445313 10 31 10 C 31.554688 10 32 10.449219 32 11 Z"></path>
                              </svg>
                            </button>
                          </li>
                        );
                      })}
                      <div className="totalFooter">
                        <span>
                          <strong>Subtotal: ₹{totalPrice}</strong>
                        </span>
                        <span className="clearall-btn">
                          <button onClick={handleClearCart}>Clear All</button>
                        </span>
                      </div>

                      <div className="mx-auto flex w-full mt-6">
                        <button
                          className="btn w-full text-center"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </button>
                      </div>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
