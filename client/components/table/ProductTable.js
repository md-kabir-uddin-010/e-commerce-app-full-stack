import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInterceptor from "../../axios/adminInterceptor";

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const { data } = await adminInterceptor.get("/api/v1/product/all");
      setProducts(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const confirm = window.confirm("Are you seure delete this product?");
      if (confirm) {
        try {
          const url = `/api/v1/product/delete/${id}`;
          const { data } = await adminInterceptor.delete(url);
          getProduct();
          toast.success(data.message);
        } catch (error) {
          toast.success(error.message);
        }
      }
    } catch (error) {
      toast.error("Product delete failed");
    }
  };
  return (
    <div className=" overflow-auto">
      <ToastContainer />
      {!products ||
        (products.length === 0 && (
          <p className=" text-center">No products found!</p>
        ))}
      {products.length > 0 && (
        <table className="w-full border dark:border-gray-500 border-collapse">
          <thead>
            <tr className="border dark:border-gray-500 bg-[#4caf50] text-white capitalize">
              <th className=" border  py-1 ">image</th>
              <th className=" border  py-1 ">product</th>
              <th className=" border  py-1 ">status</th>
              <th className=" border  py-1 ">actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border even:bg-gray-300 odd:bg-white dark:even:bg-gray-500 dark:odd:bg-slate-600 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                <td className=" text-center border">
                  {product &&
                    product.images.map((img) => {
                      if (img.featured) {
                        return (
                          <span className="py-1 px-2  mx-1" key={img._id}>
                            <img
                              className=" inline-block w-8 h-8 rounded-full"
                              src={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${img.url}`}
                              alt="no image"
                            />
                          </span>
                        );
                      }
                    })}
                </td>
                <td className=" ">
                  <span className=" ml-1">{product.title}</span>
                </td>
                <td className=" border text-center">
                  {product.publish ? "published" : "none"}
                </td>
                <td className="border text-center">
                  <Link
                    href={`/admin/dashboard/products/edit/?id=${product._id}`}
                  >
                    <a>
                      <button
                        type="button"
                        className=" my-1 mx-1 capitalize px-2 bg-orange-400 text-white rounded-md"
                      >
                        edit
                      </button>
                    </a>
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className=" my-1 mx-1 capitalize bg-red-500 px-2 rounded-md  text-white"
                    type="button"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
