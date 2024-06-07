import { Link, useLoaderData } from "react-router-dom";

// Icons
import { IoIosPricetags } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

// Slider Component
import Slider from "../components/Slider";

// React Helmet
import { Helmet } from "react-helmet";

// Toastify
import { toast } from "react-toastify";

// Lottie
import Lottie from "lottie-react";
import computerAnimation from "../assets/computer-animation.json";

const Home = () => {
  const [itemsData, categoriesData, reviewsData] = useLoaderData();

  return (
    <div className="mb-12 space-y-16">
      <Helmet>
        <title>Crafted Gems</title>
      </Helmet>
      <Slider />

      {/* Craft items section */}
      <section>
        <h3 className="text-2xl font-lato font-bold mb-3 text-center underline underline-offset-4">
          Craft Items
        </h3>
        <p className="max-w-lg mx-auto mb-10 text-center">
          Explore our Craft Items showcase for unique handmade creations, each
          crafted with care and creativity to inspire.
        </p>

        {/* Properties */}
        <div className="flex gap-6 flex-wrap justify-evenly">
          {itemsData.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg h-[288px]"
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
                <h5 className="italic text-sm">{item.category}</h5>
                <h3 className="mb-2 font-lato text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
        </div>
      </section>

      {/* Craft Category Section */}
      <section>
        <h3 className="text-2xl font-lato font-bold mb-3 text-center underline underline-offset-4">
          Art & Craft Categories
        </h3>
        <p className="max-w-lg mx-auto mb-10 text-center">
          Explore our Craft Items showcase for unique handmade creations, each
          crafted with care and creativity to inspire.
        </p>

        <div className="flex gap-5 flex-wrap justify-evenly">
          {categoriesData.map((item) => (
            <Link
              key={item._id}
              to={`/categorical/${item.name}`}
              data-tooltip-id="elm-tooltip"
              data-tooltip-content="View Categorical Items"
            >
              <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-[310px]">
                <img
                  className="rounded-t-lg h-[200px] w-full"
                  src={item.image}
                  alt={item.name}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-lato font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
                    {item.description}
                  </p>
                  <p>Items: {item.item_count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* User Reviews */}
      <section>
        <h3 className="text-2xl font-lato font-bold mb-3 text-center underline underline-offset-4">
          Customer Reviews
        </h3>
        <p className="max-w-lg mx-auto mb-10 text-center">
          Read what customers say about us in our Reviews Section. Discover why
          crafters love our products.
        </p>

        {/* Reviews */}

        <div className="w-full inline-flex flex-nowrap overflow-hidden">
          <ul className="flex gap-8 items-center justify-center md:justify-start animate-infinite-scroll">
            {reviewsData.map((item) => (
              <li
                key={item._id}
                className="relative w-80 sm:w-96 h-60 sm:h-[210px] p-6 rounded-lg shadow-lg dark:bg-gray-800 border dark:border-gray-700"
              >
                <img
                  src={item.image}
                  alt={item.reviewer_name}
                  className="rounded-tr-lg w-12 border border-gray-600 absolute top-0 right-0"
                />
                <h4 className="font-lato text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.reviewer_name}
                </h4>
                <blockquote className="text-lg italic font-semibold text-gray-900 dark:text-white mb-3">
                  <p>"{item.comment}"</p>
                </blockquote>
                <p className="flex gap-2 items-center font-semibold">
                  <FaStar />
                  {item.rating} / 5.0
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* User Thoughts */}
      <section>
        <h3 className="text-2xl font-lato font-bold mb-3 text-center underline underline-offset-4">
          Your Thoughts
        </h3>
        <p className="max-w-lg mx-auto mb-10 text-center">
          Let us Know your thoughts about Our Service. Every Suggestion is
          Welcomed!
        </p>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <Lottie animationData={computerAnimation} />
          </div>
          <form
            className="w-full md:w-auto md:flex-grow space-y-4 md:space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
              toast.success("Thanks for your Feedback!");
            }}
          >
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white text-center underline underline-offset-8 mb-10">
              Tell Us Your Thoughts
            </h1>
            <div>
              <label className="block text-sm font-medium dark:text-white">
                Your Email <span className="text-red-600">*</span>
                <input
                  type="email"
                  name="email"
                  className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                  placeholder="name@company.com"
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-white">
                Message Title <span className="text-red-600">*</span>
                <input
                  type="text"
                  name="title"
                  className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                  placeholder="Your Title Here..."
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-white">
                Your Message <span className="text-red-600">*</span>
                <textarea
                  name="message"
                  className="mt-2 border-2 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-gray-400"
                  placeholder="Your Message Here..."
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              name="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
