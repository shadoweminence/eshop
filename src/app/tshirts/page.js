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
  // Filter products with category 'Tshirt'
  const tshirts = products.filter(
    (product) => product.category.toLowerCase() === "tshirt"
  );
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {tshirts.map((tshirt) => {
              return (
                <div
                  key={tshirt._id}
                  className="lg:w-80 md:w-5/12 p-4 w-full shadow-lg mx-4 my-4"
                >
                  <a className="block relative rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className=" m-auto h-64 block"
                      src={tshirt.img}
                    />
                  </a>
                  <div className="text-center md:text-left mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      T-shirt
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {tshirt.title}
                    </h2>
                    <p className="mt-1">{tshirt.price}</p>
                    <p className="mt-1">S,M,L,XL,XXL</p>
                  </div>
                  <Link
                    className=" flex justify-center md:justify-start"
                    href={`products/${tshirt.slug}`}
                  >
                    <button className="bg-blue-400 text-white px-3   rounded py-1">
                      Browse more
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
