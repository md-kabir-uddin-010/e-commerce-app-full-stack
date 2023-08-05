import Link from "next/link";
import React from "react";

export default function Products({ data }) {
  return (
    <div className=" grid grid-cols-1 justify-items-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {data && data.length === 0 && <p>no product found</p>}
      {data &&
        data.map((item) => (
          <div key={item._id}>
            <div className=" w-72 max-w-sm mx-auto my-3 p-4 sm:mx-2 dark:bg-slate-800 rounded-md shadow-md">
              <div className=" w-full h-60 relative">
                <p
                  className={`${
                    !item.free_shiping && "hidden"
                  }  p-1 text-white bg-black absolute top-0 right-0`}
                >
                  free shipping
                </p>
                {item?.images?.map((img) => {
                  if (img.featured) {
                    return (
                      <Link key={img._id} href={`/details/${item._id}`}>
                        <a>
                          <img
                            className="bg-cover  w-full h-full"
                            key={img._id}
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${img.url}`}
                            alt={"no image found"}
                          />
                        </a>
                      </Link>
                    );
                  }
                })}
              </div>
              <div className=" py-4">
                <p className=" text-center">{item.title && item.title}</p>
                <p className=" text-center">
                  {item.description && item.description.slice(0, 20)}...
                </p>
                <p className=" text-center">
                  {" "}
                  <span className="capitalize font-semibold text-lg">
                    price
                  </span>{" "}
                  {item.sale_price && item.sale_price}{" "}
                  {item.currency_format && item.currency_format}
                </p>
                <p className=" capitalize text-center">
                  <span className=" line-through py-1 font-semibold text-lg">
                    reguler price
                  </span>{" "}
                  {item.reguler_price && item.reguler_price}
                  <span>{item.currency_format && item.currency_format}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
