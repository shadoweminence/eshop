import React from "react";
import Link from "next/link";

async function getProducts() {
  const response = await fetch(
    "http://localhost:3000/api/Products/getProducts"
  );

  const data = await response.json();

  return data.products;
}

const page = async () => {
  const products = await getProducts();

  // Process products to extract sizes and colors for 'hoodie' category
  let hoodies = {};
  for (let product of products) {
    if (product.availableQty > 0) {
      if (product.category.toLowerCase() === "hoodie") {
        if (product.title in hoodies) {
          // Check and update available sizes and colors
          if (!hoodies[product.title].color.includes(product.color)) {
            hoodies[product.title].color.push(product.color);
          }
          if (!hoodies[product.title].size.includes(product.size)) {
            hoodies[product.title].size.push(product.size);
          }
        } else {
          // Initialize the hoodie object
          hoodies[product.title] = {
            ...product,
            color: [product.color],
            size: [product.size],
          };
        }
      }
    }
  }
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.values(hoodies).length === 0 && (
              <p>
                Sorry all the hoodies are currently out of stock. New stock
                coming soon. Stay Tuned.
              </p>
            )}
            {Object.values(hoodies).map((hoodie) => {
              return (
                <Link key={hoodie._id} href={`products/${hoodie.slug}`}>
                  <div className="lg:w-80 md:w-64 p-4 w-full shadow-lg mx-4 my-4">
                    <img
                      alt="ecommerce"
                      className=" m-auto h-64 block"
                      src={hoodie.img}
                    />

                    <div className="text-center md:text-left mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        T-shirt
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {hoodie.title}
                      </h2>
                      <p className="mt-1">{hoodie.price}</p>
                      <div className="mt-1">
                        {hoodie.size.includes("S") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            S
                          </span>
                        )}
                        {hoodie.size.includes("M") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            M
                          </span>
                        )}
                        {hoodie.size.includes("L") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            L
                          </span>
                        )}
                        {hoodie.size.includes("XL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {hoodie.size.includes("XXL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        {hoodie.color.includes("red") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {hoodie.color.includes("black") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {hoodie.color.includes("white") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {hoodie.color.includes("blue") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {hoodie.color.includes("green") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {hoodie.color.includes("gray") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
