import { useContext, useEffect, useState } from "react";
import UserDataContext from "../context/context";
import { Link } from "react-router-dom";

// Icons
import { FaPen } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

// React Helmet
import { Helmet } from "react-helmet";

// React Toast
import { toast } from "react-toastify";

// Sweet Alert
import Swal from "sweetalert2";

const MyList = () => {
  const context = useContext(UserDataContext);
  const { userAuthData } = context;
  const [itemsData, setItemsData] = useState(null);
  const [mainItemsData, setMainItemsData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/items?uid=${userAuthData.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setMainItemsData(data);
        setItemsData(data);
      });
  }, []);

  // Delete Item
  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you Sure you want to Delete?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/items/${id}`,
          {
            method: "DELETE",
            headers: {
              uid: userAuthData.uid,
            },
          }
        );
        const serverResponse = await res.json();
        if (serverResponse.success) {
          setItemsData(itemsData.filter((item) => item._id !== id));
          setMainItemsData(mainItemsData.filter((item) => item._id !== id));
          toast.success("Item Deleted Successfully!");
        } else {
          toast.error(serverResponse.message);
        }
      }
    });
  };

  return (
    <div className="mb-12">
      <Helmet>
        <title>Your Crafts List | Crafted Gems</title>
      </Helmet>

      <h3 className="mb-4 text-xl font-lato font-semibold p-6 w-full bg-gray-200 dark:bg-gray-800 text-center border-b-2 border-gray-400 dark:border-gray-500">
        Your Crafts List
      </h3>

      {/* List */}
      <div>
        <label className="font-medium dark:text-white flex max-w-sm mx-auto items-center mb-10 gap-5">
          Customization:
          <select
            name="customization"
            className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
            onChange={(e) => {
              if (e.target.value === "no-filter") {
                setItemsData(mainItemsData);
              } else {
                setItemsData(
                  mainItemsData.filter(
                    (item) => item.customization === e.target.value
                  )
                );
              }
            }}
            data-tooltip-id="elm-tooltip"
            data-tooltip-content="Filter by `customization` Value"
          >
            <option className="hidden">-- Select Filter --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="no-filter">No Filter</option>
          </select>
        </label>

        {itemsData === null ? (
          <div className="flex flex-col items-center mb-5 gap-3">
            <span className="loading loading-spinner loading-lg"></span>{" "}
            <span className="text-2xl font-semibold">Loading Data</span>
          </div>
        ) : itemsData.length === 0 ? (
          <div className="text-center mb-5 text-2xl font-semibold italic">
            {" "}
            No Data to Show!
          </div>
        ) : (
          <div className="flex gap-6 flex-wrap justify-evenly">
            {itemsData.map((item) => (
              <div
                key={item._id}
                className="relative max-w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-t-lg h-[200px]"
                  src={item.image}
                  alt={item.item_name}
                />
                <div
                  className={`absolute shadow-lg top-0 left-0 text-white ${
                    item.stockStatus === "In stock"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  } px-2 py-1 rounded-tl-lg rounded-tr-md rounded-bl-md`}
                >
                  <p className="text-sm font-semibold">{item.stockStatus}</p>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 font-lato text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.item_name}
                  </h3>

                  <div className="lex flex-wrap text-sm gap-3">
                    <p>
                      Price:{" "}
                      <span className="font-semibold">{item.price}$</span>
                    </p>
                    <p>
                      Rating:{" "}
                      <span className="font-semibold">{item.rating} / 5.0</span>
                    </p>
                  </div>
                  <p className="mb-6">
                    Customization:{" "}
                    <span className="font-semibold">{item.customization}</span>
                  </p>

                  <div className="flex gap-5 justify-center">
                    <Link
                      to={`/update-craft/${item._id}`}
                      className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <FaPen /> Update
                    </Link>
                    <button
                      className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      <MdOutlineDelete /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
