// Icons
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav>
        <h1 className="text-3xl font-lato font-bold mb-2">Crafted Gems</h1>
        <p className="max-w-lg mx-auto text-center">
          Elevate your crafting experience with our curated selection of paper
          crafts and glass art supplies. Explore creativity and inspire others
          with our vibrant community of artisans.
        </p>
      </nav>
      <nav className="flex gap-4 flex-wrap justify-center">
        <a href="tel:+8801700000000" className="flex gap-2 items-center">
          <FaPhoneFlip className="text-lg" /> <span>+8801700000000</span>
        </a>
        <a
          href="mailto:admin@craftedgems.com"
          className="flex gap-2 items-center"
        >
          <MdEmail className="text-lg" /> <span>admin@craftedgems.com</span>
        </a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-6 dark:text-white text-2xl">
          <a className="cursor-pointer">
            <FaTwitter />
          </a>
          <a className="cursor-pointer">
            <FaYoutube />
          </a>
          <a className="cursor-pointer">
            <FaFacebookF />
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;
