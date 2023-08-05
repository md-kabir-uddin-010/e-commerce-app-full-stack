import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductForm from "../../../../components/form/ProductForm";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import ProductTable from "../../../../components/table/ProductTable";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [productModal, setProductModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_refresh_token");
    if (!token) {
      router.push("/admin/dashboard/login");
      return;
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <DashboardLayout>
        <div className=" py-2 px-1">
          <div className=" flex items-center justify-between">
            <h1 className=" text-2xl">Products</h1>
            <button
              onClick={() => setProductModal(true)}
              className=" outline-none border-none capitalize bg-indigo-600 text-white py-2 px-3 rounded-lg"
            >
              add new product
            </button>
          </div>
          {/* modal */}
          {productModal && (
            <div className=" my-4 p-1 border border-gray-300 dark:border-gray-500 shadow-md rounded-md">
              <div className=" text-right">
                <button
                  onClick={() => setProductModal(false)}
                  className=" capitalize p-1 outline-none border-none hover:bg-slate-500 hover:text-white rounded-lg"
                >
                  close
                </button>
              </div>
              <div className=" w-full">
                <ProductForm
                  productModal={productModal}
                  setProductModal={setProductModal}
                />
              </div>
            </div>
          )}
          <div>
            <h2>All products</h2>
            <ProductTable />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

Products.getLayout = function (page) {
  return <>{page}</>;
};
