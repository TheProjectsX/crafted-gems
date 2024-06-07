import { Link, useLoaderData, useParams } from "react-router-dom";

// Icons
import { FaArrowRightLong } from "react-icons/fa6";

// React Helmet
import { Helmet } from "react-helmet";

const AllCrafts = () => {
  const itemsData = useLoaderData();
  return (
    <div className="mb-12 space-y-10">
      <Helmet>
        <title>All Art & Craft Items | Crafted Gems</title>
      </Helmet>

      <h3 className="mb-4 text-xl font-lato font-semibold p-6 w-full bg-gray-200 dark:bg-gray-800 text-center border-b-2 border-gray-400 dark:border-gray-500">
        All Art & Craft Items
      </h3>
      {/* Properties */}
      <div className="overflow-x-auto max-w-screen-lg mx-auto">
        <table className="table table-zebra min-w-max">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th></th>
              <th>Image</th>
              <th>Craft Name</th>
              <th>Category</th>
              <th>Stock Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {itemsData.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt={item.item_name} />
                    </div>
                  </div>
                </td>
                <td>{item.item_name}</td>
                <td>{item.category}</td>
                <td>{item.stockStatus}</td>
                <th>
                  <Link
                    to={`/craft-details/${item._id}`}
                    className="btn btn-link p-0"
                    onClick={() => handleEditItem(item._id)}
                  >
                    View Details <FaArrowRightLong />
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  q;
};

export default AllCrafts;
