"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { GiCrossedBones, GiShoppingBag } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { useCart } from "@/context/CartProvider";

const Navbar = () => {
  const { logout, cart, user, addToCart, clearCart, removeFromCart, subTotal } =
    useCart();
  const [dropdown, setDropdown] = useState(false);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center  py-2 items-center shadow-md sticky top-0 z-10 bg-white">
      <div className="logo mx-5">
        <Link href={"/"}>
          {" "}
          <img className="w-20" src="loho.png" alt="" />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-3 font-bold md:text-xl">
          <Link className=" cursor-pointer hover:text-blue-600" href="/tshirts">
            <li>Tshirts</li>
          </Link>
          <Link
            className=" cursor-pointer hover:text-blue-600"
            href={"/hoodies"}
          >
            <li>Hoddies</li>
          </Link>
          <Link
            className=" cursor-pointer hover:text-blue-600"
            href={"/stickers"}
          >
            <li>Stickers</li>
          </Link>
          <Link className=" cursor-pointer hover:text-blue-600" href={"/mugs"}>
            <li>Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0  cursor-pointer top-4  mx-5 flex">
        <div
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {user.value && (
            <MdAccountCircle className="text-xl hover:text-blue-600 md:text-3xl mx-2" />
          )}
          {dropdown && (
            <div className="absolute bg-blue-300 top-7 rounded-md px-5 py-4 w-32 right-12">
              <ul>
                <Link href={"/myaccount"}>
                  <li className="py-1 font-bold hover:text-blue-700 text-sm">
                    My Account
                  </li>
                </Link>
                <Link href={"/orders"}>
                  <li className="py-1 font-bold hover:text-blue-700 text-sm">
                    Orders
                  </li>
                </Link>

                <li
                  onClick={logout}
                  className="py-1 font-bold hover:text-blue-700 text-sm"
                >
                  Log Out
                </li>
              </ul>
            </div>
          )}{" "}
        </div>
        {!user.value && (
          <Link href={"/Login"}>
            <button className="bg-blue-600 px-2 py-1 rounded-md text-sm text-white">
              Login
            </button>
          </Link>
        )}
        <FaShoppingCart
          onClick={toggleCart}
          className="text-xl hover:text-blue-600 md:text-3xl mx-2"
        />
      </div>

      <div
        ref={ref}
        className="w-72 h-[100vh] sideCart absolute top-0 right-0 bg-blue-100 py-10 px-8 transition-transform translate-x-full transform z-50 overflow-y-scroll"
      >
        <h2 className="font-bold text-center text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute cursor-pointer top-2 right-2"
        >
          <GiCrossedBones />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-5 text-base font-semibold">
              Your Cart is Empty!
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].color})
                  </div>
                  <div className="w-1/3 flex font-semibold text-lg ">
                    <FaMinus
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="mx-2 cursor-pointer text-blue-400 my-1"
                    />
                    {cart[k].qty}
                    <FaPlus
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer mx-2 text-blue-400 my-1"
                    />
                  </div>
                </div>
              </li>
            );
          })}
          <h3>Subtotal = Rs. {subTotal}</h3>
        </ol>
        <div className="flex">
          <Link href="/checkout">
            <button className="flex  text-white bg-blue-400 border-0 py-2 px-2 focus:outline-none hover:bg-blue-500 rounded text-sm">
              <GiShoppingBag className="my-0 mx-2" />
              Check Out
            </button>
          </Link>

          <button
            onClick={clearCart}
            className="flex  text-white bg-blue-400 border-0 mx-2 py-2 px-2 focus:outline-none hover:bg-blue-500 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
