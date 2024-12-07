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

  // Process products to extract sizes and colors for 'Tshirt' category
  let tshirts = {};
  for (let product of products) {
    if (product.availableQty > 0) {
      if (product.category.toLowerCase() === "tshirt") {
        if (product.title in tshirts) {
          // Check and update available sizes and colors
          if (!tshirts[product.title].color.includes(product.color)) {
            tshirts[product.title].color.push(product.color);
          }
          if (!tshirts[product.title].size.includes(product.size)) {
            tshirts[product.title].size.push(product.size);
          }
        } else {
          // Initialize the tshirt object
          tshirts[product.title] = {
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
            {Object.values(tshirts).length === 0 && (
              <p>
                Sorry all the tshirts are currently out of stock. New stock
                coming soon. Stay Tuned.
              </p>
            )}
            {Object.values(tshirts).map((tshirt) => {
              return (
                <Link key={tshirt._id} href={`products/${tshirt.slug}`}>
                  <div className="lg:w-80 md:w-64 p-4 w-full shadow-lg mx-4 my-4">
                    <img
                      alt="ecommerce"
                      className=" m-auto h-64 block"
                      src={tshirt.img}
                    />

                    <div className="text-center md:text-left mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        T-shirt
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {tshirt.title}
                      </h2>
                      <p className="mt-1">{tshirt.price}</p>
                      <div className="mt-1">
                        {tshirt.size.includes("S") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            S
                          </span>
                        )}
                        {tshirt.size.includes("M") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            M
                          </span>
                        )}
                        {tshirt.size.includes("L") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            L
                          </span>
                        )}
                        {tshirt.size.includes("XL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {tshirt.size.includes("XXL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        {tshirt.color.includes("red") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {tshirt.color.includes("black") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {tshirt.color.includes("white") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {tshirt.color.includes("blue") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {tshirt.color.includes("green") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {tshirt.color.includes("gray") && (
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
