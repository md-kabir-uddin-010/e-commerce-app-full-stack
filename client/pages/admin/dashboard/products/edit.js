import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInterceptor from "../../../../axios/adminInterceptor";
import Chackbox from "../../../../components/form/fields/Chackbox";
import Input from "../../../../components/form/fields/Input";
import Select from "../../../../components/form/fields/Select";
import Textarea from "../../../../components/form/fields/Textarea";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import useProductFormValidator from "../../../../hooks/useProductFormValidator";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    title: "",
    description: "",
    reguler_price: "",
    sale_price: "",
    currency_format: "$",
    free_shiping: false,
    publish: false,
  });
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState({});
  const [selectedImage, setSelectedImage] = useState([]);
  const [getImageShow, setGetImageShow] = useState([]);
  const [errors, setErrors] = useState({});

  const getProductById = async (id) => {
    try {
      const { data } = await adminInterceptor.get(`/api/v1/product/${id}`);
      setValues({
        ...values,
        title: data.title,
        description: data.description,
        reguler_price: data.reguler_price,
        sale_price: data.sale_price,
        currency_format: data.currency_format,
        free_shiping: data.free_shiping,
        publish: data.publish,
      });
      setSizes(data.avilable_sizes);
      setGetImageShow(data.images);
    } catch (error) {
      toast.error("Intenal server error!");
    }
  };

  useEffect(() => {
    id && getProductById(id);
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("admin_refresh_token");
    if (!token) {
      router.push("/admin/dashboard/login");
      return;
    }
    setLoading(false);
  }, []);

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
    if (e.target.name === "free_shiping" || e.target.name === "publish") {
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
    formData.set("publish", values.publish);
    if (images) {
      Array.from(images).forEach((file) => formData.append("images", file));
    }
    const isValid = useProductFormValidator(values);
    setErrors(isValid);

    const totalImg = 4 - getImageShow.length;

    if (images.length > totalImg) {
      alert("Max 4 image alowed on singel Product");
      return;
    }

    if (Object.keys(isValid).length === 0 && sizes.length > 0) {
      try {
        const { data } = await adminInterceptor.put(
          `/api/v1/product/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        setValues({
          ...values,
          title: data.info.title,
          description: data.info.description,
          reguler_price: data.info.reguler_price,
          sale_price: data.info.sale_price,
          currency_format: data.info.currency_format,
          free_shiping: data.info.free_shiping,
          publish: data.info.publish,
        });
        setSizes(data.info.avilable_sizes);
        setGetImageShow(data.info.images);
        setImages({});
        setSelectedImage([]);
        toast.success(data.message);
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

  const deleteImage = async (imageId) => {
    try {
      const confirm = window.confirm("Are you seure delete this image?");
      if (confirm) {
        try {
          const url = `/api/v1/product/${id}/image/delete/${imageId}`;
          const { data } = await adminInterceptor.delete(url);
          setValues({
            ...values,
            title: data.info.title,
            description: data.info.description,
            reguler_price: data.info.reguler_price,
            sale_price: data.info.sale_price,
            currency_format: data.info.currency_format,
            free_shiping: data.info.free_shiping,
            publish: data.info.publish,
          });
          setSizes(data.info.avilable_sizes);
          setGetImageShow(data.info.images);
          toast.success(data.message);
        } catch (error) {
          toast.success(error.message);
        }
      }
    } catch (error) {
      toast.error("Image delete failed!");
    }
  };

  const featuredImage = async (imageId) => {
    try {
      const url = `/api/v1/product/${id}/image/update/featured/${imageId}`;
      const { data } = await adminInterceptor.put(url);
      setValues({
        ...values,
        title: data.info.title,
        description: data.info.description,
        reguler_price: data.info.reguler_price,
        sale_price: data.info.sale_price,
        currency_format: data.info.currency_format,
        free_shiping: data.info.free_shiping,
        publish: data.info.publish,
      });
      setSizes(data.info.avilable_sizes);
      setGetImageShow(data.info.images);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <ToastContainer />
      <DashboardLayout>
        <div>
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
                    <span className=" select-none">
                      Drag & drop image here Or
                    </span>
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
                          alt="np image found"
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
              <div className="">
                <p className=" my-1">Product images</p>
                <div className=" flex items-center">
                  {getImageShow &&
                    getImageShow.map((image) => (
                      <div key={image._id}>
                        <div className="relative mx-1">
                          {image.featured && (
                            <span className=" capitalize bg-green-400 py-1 px-2 absolute top-0 left-0">
                              {image.featured && "featured"}
                            </span>
                          )}
                          <div className="tooltip-container">
                            {!image.featured && (
                              <span className="tooltip-text text-white z-50 bg-black rounded-md py-1 px-2">
                                Click to featured
                              </span>
                            )}
                            <img
                              onClick={() => {
                                if (!image.featured) {
                                  featuredImage(image._id);
                                } else {
                                  alert("This image alredy featured!");
                                }
                              }}
                              src={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${image.url}`}
                              alt="image not found"
                              className=" hover:bg-black hover:opacity-75 cursor-pointer w-40 h-40 "
                            />
                          </div>
                          <button
                            onClick={() => deleteImage(image._id)}
                            className=" my-1 mx-1 capitalize bg-red-500 px-2 rounded-md  text-white"
                            type="button"
                          >
                            delete
                          </button>
                        </div>
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
                  checked={values.free_shiping ? true : false}
                  handleInput={handleInput}
                />
                <div className=" capitalize">avilable sizes</div>
                <div className=" flex">
                  <Chackbox
                    label={"x"}
                    name={"x"}
                    value={"X"}
                    checked={sizes?.includes("X") ? true : false}
                    handleInput={handleSizes}
                  />
                  <Chackbox
                    label={"xl"}
                    name={"xl"}
                    value={"XL"}
                    checked={sizes?.includes("XL") ? true : false}
                    handleInput={handleSizes}
                  />
                  <Chackbox
                    label={"xxl"}
                    name={"xxl"}
                    value={"XXL"}
                    checked={sizes?.includes("XXL") ? true : false}
                    handleInput={handleSizes}
                  />
                  <Chackbox
                    label={"xs"}
                    name={"xs"}
                    value={"XS"}
                    checked={sizes?.includes("XS") ? true : false}
                    handleInput={handleSizes}
                  />
                  <Chackbox
                    label={"l"}
                    name={"l"}
                    value={"L"}
                    checked={sizes?.includes("L") ? true : false}
                    handleInput={handleSizes}
                  />
                  <Chackbox
                    label={"m"}
                    name={"m"}
                    value={"M"}
                    checked={sizes?.includes("M") ? true : false}
                    handleInput={handleSizes}
                  />
                  <Chackbox
                    label={"s"}
                    name={"s"}
                    value={"S"}
                    checked={sizes?.includes("S") ? true : false}
                    handleInput={handleSizes}
                  />
                </div>
                <div className="">Publish</div>
                <div className="">
                  <Chackbox
                    label={"publish"}
                    name={"publish"}
                    value={"publish"}
                    checked={values.publish}
                    handleInput={handleInput}
                  />
                </div>
                <p className=" text-red-500">
                  {sizes?.length === 0 && " Avilable sizes is required"}
                </p>
              </div>
            </div>
            <div className=" w-48 my-4 mx-auto">
              <input
                className=" cursor-pointer w-full capitalize bg-indigo-600 py-1 px-2 text-white rounded-md"
                type="submit"
                value="update"
              />
            </div>
          </form>
        </div>
      </DashboardLayout>
    </div>
  );
}
Edit.getLayout = (page) => {
  return <>{page}</>;
};
