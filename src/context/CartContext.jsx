import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [showPopUp, setShowPopUp] = useState(false);

  const openPopUp = () => {
    setShowPopUp(true);
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  // Storing our Items in Local Storage
  const cartItemsFrpmLocalStorage =
    JSON.parse(localStorage.getItem("cartItems")) || [];

  // cart function start here
  const [cartItems, setCartItems] = useState(cartItemsFrpmLocalStorage);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // notify use for notification message when add cart button click
  const notify = () => {
    toast.success("An item has been added!", {
      position: "top-center",
    });
  };

  const handleAddToCart = (product) => {
    const itemExits = cartItems.find((item) => item.id === product.id);
    if (itemExits && itemExits.quantity < itemExits.stockQty) {
      setCartItems(
        cartItems.map((singleItem) => {
          return singleItem.id === product.id
            ? { ...itemExits, quantity: itemExits.quantity + 1 }
            : singleItem;
        }),
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // console.log(products);
  };

  //this for single product count on cart icon
  const count = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrease = (product) => {
    const itemExists = cartItems.find((item) => item.id === product.id);

    if (itemExists && itemExists.quantity < itemExists.stockQty) {
      setCartItems(
        cartItems.map((singleItem) =>
          singleItem.id === product.id
            ? { ...itemExists, quantity: itemExists.quantity + 1 }
            : singleItem,
        ),
      );
    }
  };

  const handleDecrease = (product) => {
    const selectedItem = cartItems.find((item) => item.id === product.id);
    if (selectedItem.quantity === 1) {
      setCartItems(
        cartItems.filter((oneItem) => oneItem.id !== selectedItem.id),
      );
    } else {
      setCartItems(
        cartItems.map((singleItem) =>
          singleItem.id === product.id
            ? { ...selectedItem, quantity: selectedItem.quantity - 1 }
            : singleItem,
        ),
      );
    }
  };

  const handleRemoveItem = (product) => {
    setCartItems(cartItems.filter((oneItem) => oneItem.id !== product.id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <>
      <CartContext.Provider
        value={{
          count,
          notify,
          showPopUp,
          openPopUp,
          closePopUp,
          cartItems,
          totalPrice,
          handleAddToCart,
          handleIncrease,
          handleDecrease,
          handleRemoveItem,
          handleClearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
