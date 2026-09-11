import React, { useState } from "react";
import { useForm } from "react-hook-form";
import heroImg from "../assets/hero.png";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const { count, cartItems, totalPrice } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [confirmDetails, setConfirmDetails] = useState(null);

  const handlProceed = (data) => {
    setConfirmDetails(data);
    openDetails();
  };

  const [showDetails, setShowDetails] = useState(false);

  const openDetails = () => {
    setShowDetails(true);
  };
  const closeDetails = () => {
    setShowDetails(false);
  };

 const today = new Date();
   // Format: "Friday, July 24, 2026"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',  // "long" (Friday), "short" (Fri), or "narrow" (F)
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(today);

  const handlePayment = () => {
    alert("Payment Successfuls");
    const orderData = {
      items: cartItems,
      total: totalPrice,
      date: formattedDate,
      userDetails:confirmDetails,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));

    navigate("/payment-successful");
  };

  return (
    <>
      <section className="checkOutSection">
        <div className="container mx-auto ">
          <div className="flex gap-[40px]">
            <div className="w-1/2 leftCol">
              <h3>Shipping Address</h3>
              <form>
                <div className="flex flex-wrap form-row">
                  <div className="w-1/2 form-field">
                    <label>
                      First Name<span className="text-[16px]">*</span>
                    </label>
                    <input
                      className="border-1 border-[#243c5a]"
                      type="text"
                      {...register("firstname", {
                        required: "First name is mandatory",
                      })}
                    />
                    {errors.firstname && (
                      <span className="errorMsg">
                        {errors.firstname.message}
                      </span>
                    )}
                  </div>

                  <div className="w-1/2 form-field">
                    <label>
                      Last Name<span className="text-[16px]">*</span>
                    </label>
                    <input
                      className="border-1 border-[#243c5a]"
                      type="text"
                      {...register("lastname", {
                        required: "Last name is mandatory",
                      })}
                    />
                    {errors.lastname && (
                      <span className="errorMsg">
                        {errors.lastname.message}
                      </span>
                    )}
                  </div>

                  <div className="w-1/2 form-field">
                    <label>
                      Email<span className="text-[16px]">*</span>
                    </label>
                    <input
                      className="border-1 border-[#243c5a]"
                      type="email"
                      {...register("email", {
                        required: "Email is mandatory",
                      })}
                    />
                    {errors.email && (
                      <span className="errorMsg">{errors.email.message}</span>
                    )}
                  </div>

                  <div className="w-1/2 form-field">
                    <label>
                      Number<span className="text-[16px]">*</span>
                    </label>
                    <input
                      className="border-1 border-[#243c5a]"
                      type="tel"
                      {...register("number", {
                        required: "Number is mandatory",
                      })}
                    />
                    {errors.number && (
                      <span className="errorMsg">{errors.number.message}</span>
                    )}
                  </div>

                  <div className="w-1/3 form-field">
                    <label>
                      City<span className="text-[16px]">*</span>
                    </label>
                    <input
                      className="border-1 border-[#243c5a]"
                      type="text"
                      {...register("city", {
                        required: "City is mandatory",
                      })}
                    />
                    {errors.city && (
                      <span className="errorMsg">{errors.city.message}</span>
                    )}
                  </div>

                  <div className="w-1/3 form-field">
                    <label>
                      State<span className="text-[16px]">*</span>
                    </label>
                    <input
                      className="border-1 border-[#243c5a]"
                      type="text"
                      {...register("state", {
                        required: "State is mandatory",
                      })}
                    />
                    {errors.state && (
                      <span className="errorMsg">{errors.state.message}</span>
                    )}
                  </div>

                  <div className="w-1/3 form-field">
                    <label>
                      Pin Code<span className="text-[16px]">*</span>
                    </label>
                    <input
                      className="border-1 border-[#243c5a]"
                      type="number"
                      {...register("pincode", {
                        required: "Pin Code is mandatory",
                      })}
                    />
                    {errors.pincode && (
                      <span className="errorMsg">{errors.pincode.message}</span>
                    )}
                  </div>

                  <div className="w-full form-field">
                    <label>
                      Address<span className="text-[16px]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      className="border-1 border-[#243c5a]"
                      type="text"
                      {...register("address", {
                        required: "Address is mandatory",
                      })}
                    />
                    {errors.address && (
                      <span className="errorMsg">{errors.address.message}</span>
                    )} 
                  </div>
                </div>
              </form>
            </div>
            <div className="w-1/2 rightCol">
              <h3>Your Cart</h3>
              {cartItems.length === 0 && <h4>Cart is empty</h4>}
              {cartItems.length >= 1 && (
                <div className="cartlist">
                  {cartItems.map((cartItem) => {
                    return (
                      <div key={cartItem.id} className="flex flex-row cart-row">
                        <div className="w-4/5">
                          <div className="flex flex-row gap-[25px] imgDetailsBox">
                            <div className="imgBox">
                              <img
                                src={cartItem.image}
                                alt="Hero"
                                className="OF-cover"
                              />
                              <span className="product-count">
                                {cartItem.quantity}
                              </span>
                            </div>
                            <div className="details">
                              <h6>{cartItem.name}</h6>
                              <span>Price: ₹{cartItem.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/5 text-right">
                          ₹{cartItem.price * cartItem.quantity}
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-between gap-[25px]">
                    <span>
                      <strong>Subtotal</strong>
                    </span>
                    <span>₹{totalPrice}</span>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleSubmit(handlProceed)}
                      className="btn w-full mt-4"
                    >
                      Proceed to payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* confirm details popup start here */}
      <div
        className="confirmPopup"
        className={`confirmPopup ${showDetails ? "popup-open" : ""}`}
        style={{
          opacity: showDetails ? "1" : "0",
          visibility: showDetails ? "visible" : "hidden",
        }}
      >
        <div className="popupoverlay">
          <div className="popupcontent flex flex-wrap">
            <div className="container mx-auto">
              <a className="close-btn" onClick={closeDetails}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="#000"
                    d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"
                  ></path>
                </svg>
              </a>
              <h4>Confirm Your Details</h4>
              {confirmDetails && (
                <ul className="mt-5">
                  <li className="capitalize flex">
                    <span className="w-[40%] font-medium">First Name:</span>
                    <span className="w-[60%]">{confirmDetails.firstname}</span>
                  </li>
                  <li className="capitalize flex">
                    <span className="w-[40%] font-medium">Last Name:</span>
                    <span className="w-[60%]">{confirmDetails.lastname}</span>
                  </li>
                  <li className="capitalize flex">
                    <span className="w-[40%] font-medium">Email:</span>
                    <span className="w-[60%]">{confirmDetails.email}</span>
                  </li>
                  <li className="capitalize flex">
                    <span className="w-[40%] font-medium">Number:</span>
                    <span className="w-[60%]">{confirmDetails.number}</span>
                  </li>
                  <li className="capitalize flex">
                    <span className="w-[40%] font-medium">City:</span>
                    <span className="w-[60%]">{confirmDetails.city}</span>
                  </li>
                  <li className="capitalize flex">
                    <span className="w-[40%] font-medium">State:</span>
                    <span className="w-[60%]">{confirmDetails.state}</span>
                  </li>
                  <li className="capitalize flex">
                    <span className="w-[40%] font-medium">Pincode:</span>
                    <span className="w-[60%]">{confirmDetails.pincode}</span>
                  </li>
                  <li className="capitalize flex">
                    <span className="w-[40%] font-medium">Address:</span>
                    <span className="w-[60%]">{confirmDetails.address}</span>
                  </li>
                  <button onClick={handlePayment} className="btn w-full mt-4">
                    Continue To Payment
                  </button>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
