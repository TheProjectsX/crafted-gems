import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import UserDataContext from "../context/context";

// React Helmet
import { Helmet } from "react-helmet";

// React Toast
import { toast } from "react-toastify";

const UpdateCraft = () => {
  const [itemToEdit, categoriesData] = useLoaderData();
  const context = useContext(UserDataContext);
  const { userAuthData } = context;

  if (itemToEdit.user_email !== userAuthData.email) {
    return (
      <div className="mb-12 space-y-16">
        <Helmet>
          <title>Edit Craft Item | Crafted Gems</title>
        </Helmet>

        <h3 className="mb-4 text-xl font-lato font-semibold p-6 w-full rounded-lg bg-gray-800 text-center">
          Edit Craft Item
        </h3>

        <div className="text-center mb-5 text-2xl font-semibold italic">
          {" "}
          Item Not Found!
        </div>
      </div>
    );
  }

  const handleCraftSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const item_name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = form.price.value;
    const rating = form.rating.value;
    const customization = form.customization.value;
    const processing_time = form.processing_time.value;
    const stockStatus = form.stockStatus.value;
    const user_uid = userAuthData.uid;

    if (
      isNaN(parseFloat(rating)) ||
      5.0 < parseFloat(rating) ||
      parseFloat(rating) < 0.0
    ) {
      toast.error("Rating must be between 0.0 to 5.0");
      return;
    }

    const itemData = {
      image,
      item_name,
      category,
      description,
      price,
      rating,
      customization,
      processing_time,
      stockStatus,
    };

    const resp = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/items/${itemToEdit._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          uid: user_uid,
        },
        body: JSON.stringify(itemData),
      }
    );
    const serverResult = await resp.json();

    if (serverResult.success) {
      toast.success("Item Updated Successfully!");
    } else {
      toast.error(serverResult.message);
    }
  };

  return (
    <div className="mb-12 space-y-10">
      <Helmet>
        <title>Update Craft Item | Crafted Gems</title>
      </Helmet>

      <h3 className="mb-4 text-xl font-lato font-semibold p-6 w-full bg-gray-200 dark:bg-gray-800 text-center border-b-2 border-gray-400 dark:border-gray-500">
        Update Craft Item
      </h3>

      <form
        className="space-y-4 md:space-y-6 max-w-screen-md mx-auto"
        onSubmit={handleCraftSubmit}
      >
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white text-center underline underline-offset-8 mb-8">
          Fill in the Form
        </h1>
        <div>
          <label className="block text-sm font-medium dark:text-white">
            Craft Name <span className="text-red-600">*</span>
            <input
              type="text"
              name="name"
              className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
              placeholder="Name of your Craft Item"
              defaultValue={itemToEdit.item_name}
              required
            />
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 *:w-full">
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Craft Image <span className="text-red-600">*</span>
              <input
                type="text"
                name="image"
                className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                placeholder="https://imgbb.com/....."
                defaultValue={itemToEdit.image}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Craft Category <span className="text-red-600">*</span>
              <select
                name="category"
                className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                defaultValue={itemToEdit.category}
              >
                {categoriesData.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-white">
            Craft Description <span className="text-red-600">*</span>
            <input
              type="text"
              name="description"
              className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
              placeholder="Short description of your Craft..."
              defaultValue={itemToEdit.description}
              required
            />
          </label>
        </div>
        <div className="flex flex-col sm:flex-row  gap-6 *:w-full">
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Craft Price ($) <span className="text-red-600">*</span>
              <input
                type="text"
                name="price"
                className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                placeholder="33.00"
                defaultValue={itemToEdit.price}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Craft Rating (Out of 5.0) <span className="text-red-600">*</span>
              <input
                type="text"
                name="rating"
                className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                placeholder="4.5"
                defaultValue={itemToEdit.rating}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Customization <span className="text-red-600">*</span>
              <select
                name="customization"
                className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                defaultValue={itemToEdit.customization}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row  gap-6 *:w-full">
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Processing Time <span className="text-red-600">*</span>
              <input
                type="text"
                name="processing_time"
                className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                placeholder="2/3 Days"
                defaultValue={itemToEdit.processing_time}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Stock Status <span className="text-red-600">*</span>
              <select
                name="stockStatus"
                className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                defaultValue={itemToEdit.stockStatus}
              >
                <option value="In Stock">In Stock</option>
                <option value="Made to Order">Made to Order</option>
              </select>
            </label>
          </div>
        </div>

        <button
          type="submit"
          name="submit"
          className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center animate__animated text-lg"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCraft;
