import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import UserDataContext from "../context/context";

// React Helmet
import { Helmet } from "react-helmet";

// React Toast
import { toast } from "react-toastify";

const AddCraft = () => {
  const categoriesData = useLoaderData();
  const context = useContext(UserDataContext);
  const { userAuthData } = context;

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
    const user_name = form.user_name.value;
    const user_email = form.user_email.value;
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
      user_email,
      user_name,
    };
    console.log(itemData, user_uid);
    const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/items`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        uid: user_uid,
      },
      body: JSON.stringify(itemData),
    });
    const serverResult = await resp.json();

    if (serverResult.success) {
      toast.success("Item Added Successfully!");
      form.reset();
    } else {
      toast.error(serverResult.message);
    }
  };

  return (
    <div className="mb-12 space-y-10">
      <Helmet>
        <title>Add new Craft Item | Crafted Gems</title>
      </Helmet>

      <h3 className="mb-4 text-xl font-lato font-semibold p-6 w-full bg-gray-200 dark:bg-gray-800 text-center border-b-2 border-gray-400 dark:border-gray-500">
        Add new Craft Item
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
              >
                <option value="In Stock">In Stock</option>
                <option value="Made to Order">Made to Order</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row  gap-6 *:w-full">
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Your Name <span className="text-red-600">*</span>
              <input
                type="text"
                name="user_name"
                className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400 text-gray-500 dark:text-gray-300 cursor-not-allowed"
                placeholder="2/3 Days"
                defaultValue={userAuthData?.displayName}
                data-tooltip-id="elm-tooltip"
                data-tooltip-content="Filled Automatically"
                disabled
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-white">
              Your Email <span className="text-red-600">*</span>
              <input
                type="email"
                name="user_email"
                className={`mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400 ${
                  userAuthData?.email
                    ? "text-gray-500 dark:text-gray-300 cursor-not-allowed"
                    : ""
                }`}
                placeholder="name@company.com"
                data-tooltip-id={userAuthData?.email ? "elm-tooltip" : ""}
                data-tooltip-content="Filled Automatically"
                defaultValue={userAuthData?.email ?? ""}
                disabled={userAuthData?.email !== null}
                required
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          name="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-600 dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center animate__animated text-lg"
        >
          Add Craft
        </button>
      </form>
    </div>
  );
};

export default AddCraft;
