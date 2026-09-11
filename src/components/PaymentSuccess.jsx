import React from "react";
import SucessIcon from "../assets/success-icon.svg";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  const { cartItems, totalPrice } = useContext(CartContext);
  const orderData = JSON.parse(localStorage.getItem("latestOrder")) || {};

  const items = orderData.items || [];
  const userDetails = orderData.userDetails || [];
  const total = orderData.total || [];
  const date = orderData.date || [];
  return (
    <>
      <section className="successSection">
        <div className="container mx-auto ">
          <div className="flex flex-wrap wrapper">
            <div className="thankMessage w-full flex flex-wrap justify-center">
              <img src={SucessIcon} className="w-full max-w-[50px]" />
              <h2 style={{ marginTop: "20px" }}>Thank you for your purchase</h2>
              <p style={{ marginTop: "10px" }}>
                We've received your order will ship in 5-7 business days.
              </p>
              <p>Your order number is #A1220</p>
            </div>

            <div className="summarySection w-full">
              <div className="orderSummary">
                <h4 style={{ marginBottom: "40px" }}>Order Details</h4>
                {items.map((item) => {
                  return (
                    <div key={item.id} className="flex flex-row orderListRow">
                      <div className="w-4/5">
                        <div className="flex flex-row gap-[25px] imgDetailsBox">
                          <div className="imgBox">
                            <img src={item.image} className="OF-cover" />
                            <span className="product-count">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="details">
                            <h6>{item.name}</h6>
                            <span>Price: ₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/5 text-right">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between gap-[25px]">
                  <span>
                    <strong>Subtotal</strong>
                  </span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="shippingDetails">
                <h4 style={{ marginBottom: "20px" }}>Order Information</h4>
                {userDetails && (
                  <p>
                    {userDetails.firstname} {userDetails.firstname}
                    <br />
                    {userDetails.address},
                    <br />
                    {userDetails.city}, {userDetails.state},{" "}
                    {userDetails.pincode}
                    <br />
                    {userDetails.email}
                    <br />
                    {userDetails.number}
                  </p>
                )}
                <p style={{ marginTop: "20px" }}>
                  <em>{date}</em>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center w-full mt-5">
              <Link to="/">
                <button className="btn">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
