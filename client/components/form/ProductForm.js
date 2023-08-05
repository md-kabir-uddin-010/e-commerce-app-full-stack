import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInterceptor from "../../axios/adminInterceptor";
import useProductFormValidator from "../../hooks/useProductFormValidator";
import Chackbox from "./fields/Chackbox";
import Input from "./fields/Input";
import Select from "./fields/Select";
import Textarea from "./fields/Textarea";

export default function ProductForm({ setProductModal, productModal }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
    reguler_price: "",
    sale_price: "",
    currency_format: "$",
    free_shiping: false,
  });
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState({});
  const [selectedImage, setSelectedImage] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {}, [selectedImage]);

  const dragOver = (e) => e.preventDefault();
  const dragLeave = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setImages(files);

    const selectedFilesArray = Array.from(files);
    const imagesArray = selectedFilesArray.map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImage(imagesArray);
  };

  const handleInput = (e) => {
    if (e.target.name === "free_shiping") {
      setValues({ ...values, [e.target.name]: e.target.checked });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  const handleSizes = (e) => {
    if (e.target.checked) {
      if (!sizes.includes(e.target.value)) {
        setSizes([...sizes, e.target.value]);
      }
    } else {
      const felterd = sizes.filter((item) => item !== e.target.value);
      setSizes(felterd);
    }
  };
  const handleImage = (e) => {
    const selectedFiles = e.target.files;
    setImages(selectedFiles);

    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImage(imagesArray);
  };
  const handleRemoveImage = (index) => {
    const i = selectedImage.indexOf(index);
    removeFile(i, images);
    const filterd = selectedImage.filter((img) => img !== index);
    setSelectedImage(filterd);
  };

  const removeFile = (index, files) => {
    const fileBuffer = new DataTransfer();
    const len = files.length;
    for (let i = 0; i < len; i++) {
      if (index !== i) {
        fileBuffer.items.add(files[i]);
      }
    }
    setImages(fileBuffer.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", values.title);
    formData.set("description", values.description);
    formData.set("reguler_price", values.reguler_price);
    formData.set("sale_price", values.sale_price);
    formData.set("currency_format", values.currency_format);
    formData.set("free_shiping", values.free_shiping);
    formData.set("avilable_sizes", JSON.stringify(sizes));
    if (images) {
      Array.from(images).forEach((file) => formData.append("images", file));
    }
    const isValid = useProductFormValidator(values);
    setErrors(isValid);

    if (
      Object.keys(isValid).length === 0 &&
      images.length > 0 &&
      images.length <= 4 &&
      sizes.length > 0
    ) {
      try {
        const { data } = await adminInterceptor.post(
          "/api/v1/product/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        toast.success(data.message);
        setProductModal(!productModal);
      } catch (error) {
        if (!error?.response) {
          toast.error("Internal server error");
        } else if (error.response?.status === 422) {
          toast.error(error.response.data.errors.message);
        } else if (error.response?.status === 406) {
          toast.error(error.response.data.errors.message);
        } else {
          toast.error("Internal server error");
        }
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className=" w-4/5 sm:w-11/12 mx-auto md:w-full lg:grid lg:grid-cols-3 lg:gap-4">
          <div className="overflow-auto p-4 bg-white dark:bg-slate-400 rounded-lg shadow-md">
            {images && images.length > 4 && (
              <p className=" text-red-500">Maximam 4 images allowed!</p>
            )}

            <div className="w-full h-28 p-1 border-2 border-dashed border-gray-400 rounded-lg bg-slate-50 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-600 ">
              <div
                onDragOver={dragOver}
                onDragLeave={dragLeave}
                onDragEnter={dragEnter}
                onDrop={fileDrop}
                className=" w-full h-full flex justify-center items-center"
              >
                <span className=" select-none">Drag & drop image here Or</span>
                <label
                  className=" ml-2 cursor-pointer capitalize text-indigo-600 dark:text-indigo-300 hover:underline"
                  htmlFor="images"
                >
                  browse
                </label>
              </div>
              <input
                className=" opacity-0"
                type="file"
                name="images"
                id="images"
                accept="image/*"
                multiple
                required
                onChange={handleImage}
              />
            </div>
            <div className=" grid grid-cols-3">
              {selectedImage &&
                selectedImage.map((img, i) => (
                  <div className=" relative m-2" key={i}>
                    <img
                      className=" bg-cover block w-40 h-40"
                      src={img}
                      alt={img}
                    />
                    <button
                      onClick={() => handleRemoveImage(img)}
                      type="button"
                      className=" w-4 h-4 absolute -top-2 -right-1 text-red-600 text-2xl "
                    >
                      &times;
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <Input
              title={"title"}
              type={"text"}
              name={"title"}
              placeholder={"title"}
              value={values.title}
              handleInput={handleInput}
            />
            <p className=" text-red-500">{errors.title && errors.title}</p>
            <Textarea
              title={"description"}
              name={"description"}
              placeholder={"description"}
              value={values.description}
              handleInput={handleInput}
            />
            <p className=" text-red-500">
              {errors.description && errors.description}
            </p>
          </div>
          <div>
            <Input
              title={"reguler price"}
              type={"number"}
              name={"reguler_price"}
              placeholder={"100"}
              value={values.reguler_price}
              handleInput={handleInput}
            />
            <p className=" text-red-500">
              {errors.reguler_price && errors.reguler_price}
            </p>

            <Input
              title={"sale price"}
              type={"number"}
              name={"sale_price"}
              placeholder={"95"}
              value={values.sale_price}
              handleInput={handleInput}
            />
            <p className=" text-red-500">
              {errors.sale_price && errors.sale_price}
            </p>

            <Select
              name={"currency_format"}
              value={values.currency_format}
              handleInput={handleInput}
            />
            <div className=" capitalize">free shiping</div>
            <Chackbox
              upper={false}
              label={"yes"}
              name={"free_shiping"}
              value={values.free_shiping}
              handleInput={handleInput}
            />
            <div className=" capitalize">avilable sizes</div>
            <div className=" flex">
              <Chackbox
                label={"x"}
                name={"x"}
                value={"X"}
                handleInput={handleSizes}
              />
              <Chackbox
                label={"xl"}
                name={"xl"}
                value={"XL"}
                handleInput={handleSizes}
              />
              <Chackbox
                label={"xxl"}
                name={"xxl"}
                value={"XXL"}
                handleInput={handleSizes}
              />
              <Chackbox
                label={"xs"}
                name={"xs"}
                value={"XS"}
                handleInput={handleSizes}
              />
              <Chackbox
                label={"l"}
                name={"l"}
                value={"L"}
                handleInput={handleSizes}
              />
              <Chackbox
                label={"m"}
                name={"m"}
                value={"M"}
                handleInput={handleSizes}
              />
              <Chackbox
                label={"s"}
                name={"s"}
                value={"S"}
                handleInput={handleSizes}
              />
            </div>
            <p className=" text-red-500">
              {sizes.length === 0 && " Avilable sizes is required"}
            </p>
          </div>
        </div>
        <div className=" w-48 my-4 mx-auto">
          <input
            className=" cursor-pointer w-full capitalize bg-indigo-600 py-1 px-2 text-white rounded-md"
            type="submit"
            value="seve"
          />
        </div>
      </form>
    </div>
  );
}
