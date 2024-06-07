import { useLoaderData } from "react-router-dom";

// React Helmet
import { Helmet } from "react-helmet";

const CraftDetails = () => {
  const itemData = useLoaderData();

  return (
    <div className="mb-12 space-y-10">
      <Helmet>
        <title>Craft Details | Crafted Gems</title>
      </Helmet>

      <h3 className="mb-4 text-xl font-lato font-semibold p-6 w-full bg-gray-200 dark:bg-gray-800 text-center border-b-2 border-gray-400 dark:border-gray-500">
        Craft Item Details
      </h3>

      {/* Details */}
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="md:w-1/2">
          <img
            src={itemData.image}
            alt={itemData.item_name}
            className="w-full rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl dark:text-white font-lato font-semibold mb-2">
            {itemData.item_name}
          </h3>
          <p className="italic mb-4">{itemData.category}</p>
          <p className="dark:text-white">{itemData.description}</p>
          <p className="mb-4">
            Author: <span className="font-semibold">{itemData.user_name}</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <p>
              Rating:{" "}
              <span className="font-semibold">{itemData.rating} / 5.00</span>
            </p>
            <p>
              Price: <span className="font-semibold">{itemData.price}$</span>
            </p>
            <p>
              Time:{" "}
              <span className="font-semibold">{itemData.processing_time}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <p>
              Stock Status:{" "}
              <span className="font-semibold">{itemData.stockStatus}</span>
            </p>
            <p>
              Customization:{" "}
              <span className="font-semibold">{itemData.customization}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftDetails;
