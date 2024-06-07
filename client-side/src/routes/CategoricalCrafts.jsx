import { Link, useLoaderData, useParams } from "react-router-dom";

// Icons
import { FaArrowRightLong } from "react-icons/fa6";

// React Helmet
import { Helmet } from "react-helmet";
import { IoTime } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";

const CategoricalCrafts = () => {
  const itemsData = useLoaderData();
  const { category } = useParams();

  return (
    <div className="mb-12 space-y-10">
      <Helmet>
        <title>Categorical Crafts | Crafted Gems</title>
      </Helmet>

      <h3 className="mb-4 text-xl font-lato font-semibold p-6 w-full bg-gray-200 dark:bg-gray-800 text-center border-b-2 border-gray-400 dark:border-gray-500">
        {category} - Categorical Crafts
      </h3>
      {/* Properties */}
      <div className="flex gap-6 flex-wrap justify-evenly">
        {itemsData.length === 0 ? (
          <div className="text-center my-6 italic text-xl font-semibold text-white">
            No Items Found for Category:{" "}
            <span className="not-italic">{category}</span>
          </div>
        ) : (
          <>
            {itemsData.map((item) => (
              <div
                key={item._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-t-lg h-[288px]"
                  src={item.image}
                  alt={item.item_name}
                />
                <div className="p-5">
                  <h5 className="italic text-sm">{item.category}</h5>
                  <h3 className="mb-2 font-lato text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.item_name}
                  </h3>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.description}
                  </p>

                  <div className="mb-6 flex flex-wrap text-sm gap-3 justify-evenly">
                    <p className="flex items-center gap-2">
                      <IoIosPricetags />
                      {item.price}$
                    </p>
                    <p className="flex items-center gap-2">
                      <FaStar />
                      {item.rating} / 5.0
                    </p>
                    <p className="flex items-center gap-2">
                      <IoTime />
                      {item.processing_time}
                    </p>
                  </div>

                  <div className="text-center">
                    <Link
                      to={`/craft-details/${item._id}`}
                      className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      View Details
                      <FaArrowRightLong />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoricalCrafts;
