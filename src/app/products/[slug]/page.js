"use client";

import { useCart } from "@/context/CartProvider";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const { cart, addToCart, buyNow, removeFromCart, subTotal } = useCart();
  const { slug } = useParams();
  const router = useRouter();
  const decodedSlug = decodeURIComponent(slug);
  const [products, setProducts] = useState(null);
  const [colorSizeSlug, setColorSizeSlug] = useState({});
  const [size, setSize] = useState(colorSizeSlug.size);
  const [color, setColor] = useState(colorSizeSlug.color);
  const [pin, setPin] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/Products/getProducts"
        );
        const data = await response.json();
        const items = data.products;

        //Find current product
        const currentProduct = items.find((item) => item.slug === decodedSlug);
        setProducts(currentProduct);

        if (currentProduct) {
          const defaultColor = currentProduct.color || ""; // Set a default color if available
          const defaultSize = currentProduct.size || ""; // Set a default size if available
          setColor(defaultColor);
          setSize(defaultSize);
        }

        //BUild color-size map
        const relatedProducts = items.filter(
          (item) => item.title === currentProduct.title
        );

        const tempColorSizeSlug = {};
        relatedProducts.forEach((item) => {
          if (!tempColorSizeSlug[item.color])
            tempColorSizeSlug[item.color] = {};
          if (!tempColorSizeSlug[item.size]) tempColorSizeSlug[item.size] = {};
          tempColorSizeSlug[item.color][item.size] = { slug: item.slug };
        });
        setColorSizeSlug(tempColorSizeSlug);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [decodedSlug]);

  const checkServicability = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      toast.success("🦄 Your Code is Servicable!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("🦄 Sorry! We do not deliver to this place yet.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };
  if (!products) return <div>Loading...</div>;

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-2/5 w-auto px-24 lg:h-auto object-cover object-top rounded"
              src={products.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                SHOPLUNCH
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {products.title}
              </h1>
              {/* <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div> */}

              <p className="leading-relaxed">{products.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>

                  {Object.keys(colorSizeSlug).includes("black") &&
                    Object.keys(colorSizeSlug["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          setColor("black");
                        }}
                        className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                          color === "black" ? "border-black" : "border-gray-300"
                        } `}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("white") &&
                    Object.keys(colorSizeSlug["white"]).includes(size) && (
                      <button
                        onClick={() => {
                          setColor("white");
                        }}
                        className={`border-2 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none ${
                          color === "white" ? "border-black" : "border-gray-300"
                        } `}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("red") &&
                    Object.keys(colorSizeSlug["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          setColor("red");
                        }}
                        className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black " : "border-gray-300"
                        } `}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("blue") &&
                    Object.keys(colorSizeSlug["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          setColor("blue");
                        }}
                        className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "blue" ? "border-black" : "border-gray-300"
                        } `}
                      ></button>
                    )}

                  {Object.keys(colorSizeSlug).includes("green") &&
                    Object.keys(colorSizeSlug["green"]).includes(size) && (
                      <button
                        onClick={() => {
                          setColor("green");
                        }}
                        className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "green" ? "border-black" : "border-gray-300"
                        } `}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("gray") &&
                    Object.keys(colorSizeSlug["gray"]).includes(size) && (
                      <button
                        onClick={() => {
                          setColor("gray");
                        }}
                        className={`border-2 ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "gray" ? "border-black" : "border-gray-300"
                        } `}
                      ></button>
                    )}
                </div>

                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(colorSizeSlug).includes("S") && (
                        <option value="S">S</option>
                      )}
                      {Object.keys(colorSizeSlug).includes("M") && (
                        <option value="M">M</option>
                      )}
                      {Object.keys(colorSizeSlug).includes("L") && (
                        <option value="L">L</option>
                      )}
                      {Object.keys(colorSizeSlug).includes("XL") && (
                        <option value="XL">XL</option>
                      )}
                      {Object.keys(colorSizeSlug).includes("XXL") && (
                        <option value="XXL">XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs. {products.price}
                </span>{" "}
                <button
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      products.price,
                      products.title,
                      size,
                      color
                    );
                  }}
                  className="flex ml-3 md:ml-8 text-sm text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      products.price,
                      products.title,
                      size,
                      color
                    );
                  }}
                  className="flex ml-2 md:ml-5 text-sm text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Add to Cart
                </button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  placeholder="Enter your city pin to check servicability"
                  onChange={onChangePin}
                  className="px-2 border-2 border-blue-400 rounded-md"
                  type="text"
                />
                <button
                  onClick={checkServicability}
                  className="flex ml-5 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;
