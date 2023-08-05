import React from "react";

export default function CartItem({
  item,
  handleRemoveItem,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <div className=" w-full h-20 my-1 flex justify-between items-center hover:bg-gray-800 dark:hover:bg-slate-800">
      <div className=" basis-3/4">
        <div className=" flex items-center">
          {item?.images?.map((img) => {
            if (img.featured) {
              return (
                <img
                  key={img._id}
                  className=" bg-green-600 bg-cover rounded-sm mx-2 w-16 h-16"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${img.url}`}
                  alt={"no image found"}
                />
              );
            }
          })}
          <div className=" ml-2">
            <p className=" text-zinc-300">{item.title}</p>
            <div className=" text-zinc-400">
              <span className=" mr-1">size : {item.selected_size}</span>
            </div>
            <p className=" text-zinc-400">quantity : {item.quantity}</p>
          </div>
        </div>
      </div>
      <div className=" relative basis-1/4">
        <div className=" flex items-center">
          <p className=" text-orange-300">$ {item.sale_price}</p>
        </div>
        <div>
          <button
            onClick={() => decreaseQuantity(item._id)}
            className=" outline-none w-6 h-auto  text-xl font-semibold hover:bg-neutral-600
           hover:rounded-sm"
            type="button"
          >
            -
          </button>
          <button
            onClick={() => increaseQuantity(item._id)}
            className=" outline-none w-6 h-auto  text-xl font-semibold hover:bg-neutral-600
           hover:rounded-sm"
            type="button"
          >
            +
          </button>
        </div>
        <div
          onClick={() => handleRemoveItem(item._id)}
          className=" absolute -top-2 right-2"
        >
          <button className=" transform translate-y-1 border-none outline-none p-1 mt-1 rounded-md z-50">
            <div className=" rotate-45 -translate-y-1 -translate-x-1 w-4 h-1 my-1 bg-red-500"></div>
            <div className=" -rotate-45 -translate-y-3 -translate-x-1 w-4 h-1 my-1 bg-red-500"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
