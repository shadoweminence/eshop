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

  // Process products to extract sizes and colors for 'mug' category
  let mugs = {};
  for (let product of products) {
    if (product.availableQty > 0) {
      if (product.category.toLowerCase() === "mug") {
        if (product.title in mugs) {
          // Check and update available sizes and colors
          if (!mugs[product.title].color.includes(product.color)) {
            mugs[product.title].color.push(product.color);
          }
          if (!mugs[product.title].size.includes(product.size)) {
            mugs[product.title].size.push(product.size);
          }
        } else {
          // Initialize the mug object
          mugs[product.title] = {
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
            {Object.values(mugs).length === 0 && (
              <p>
                Sorry all the mugs are currently out of stock. New stock coming
                soon. Stay Tuned.
              </p>
            )}
            {Object.values(mugs).map((mug) => {
              return (
                <Link key={mug._id} href={`products/${mug.slug}`}>
                  <div className="lg:w-80 md:w-64 p-4 w-full shadow-lg mx-4 my-4">
                    <img
                      alt="ecommerce"
                      className=" m-auto h-64 block"
                      src={mug.img}
                    />

                    <div className="text-center md:text-left mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        T-shirt
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {mug.title}
                      </h2>
                      <p className="mt-1">{mug.price}</p>
                      <div className="mt-1">
                        {mug.size.includes("S") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            S
                          </span>
                        )}
                        {mug.size.includes("M") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            M
                          </span>
                        )}
                        {mug.size.includes("L") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            L
                          </span>
                        )}
                        {mug.size.includes("XL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {mug.size.includes("XXL") && (
                          <span className="border border-gray-300 px-1 mx-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        {mug.color.includes("red") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {mug.color.includes("black") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {mug.color.includes("white") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {mug.color.includes("blue") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {mug.color.includes("green") && (
                          <button className="border border-gray-300 px-1 mx-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {mug.color.includes("gray") && (
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
