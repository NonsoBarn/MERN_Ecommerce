/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FaStar, FaHeart } from "react-icons/fa6";
import { ShopContext } from "../context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <section className="max-padd-container flex flex-col gap-8 xl:flex-row bg-primary py-4">
      {/* left side */}
      <div className="flex gap-x-2 xl:flex-1 py-5">
        <div className="max-h-[355px] w-auto flex">
          <img
            src={product.image}
            alt="bigIMg"
            className="rounded-xl bg-gray-10"
          />
        </div>
      </div>
      {/* right side */}
      <div className="flex-col flex xl:flex-[1.5] bg-white py-2 rounded-xl px-6">
        <h3 className="h3 sm:line-clap-1">{product.name}</h3>
        <div className="flex items-start gap-x-2 medium-16">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <p>{223}</p>
        </div>
        <div>
          <div className="flex items-baseline gap-x-6 bold-28 sm:bold-32 mt-4 ">
            <div>₦{product.new_price}.00</div>
            <div className="bold-20 sm:bold-28 line-through text-secondary">
              ₦{product.old_price}.00
            </div>
          </div>
          <div className="flex gap-3 mb-8 pt-5 max-w-[555px]">
            <button
              onClick={() => {
                addToCart(product.id);
              }}
              className="btn-dark rounded-md"
            >
              Add to cart
            </button>
            <button className="rounded-md !px-4 btn-dark">
              <FaHeart />
            </button>
          </div>
          <p>
            <span>Category:</span>
          </p>
          <p>
            <span>Tags:</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
