/* eslint-disable react/prop-types */
import { RiShoppingBag2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Item = ({ id, name, image, old_price, new_price, description }) => {
  // console.log(name, description);
  return (
    <Link
      onClick={window.scrollTo(0, 0)}
      to={`/product/${id}`}
      className="bg-white p-4 rounded-xl relative"
    >
      <div className="flexCenter">
        <img
          src={image}
          alt=""
          height={211}
          width={211}
          className="rounded-lg drop-shadow-xl absolute bottom-50 "
        />
      </div>
      <div className="flex flex-col gap-y-3 pt-28">
        <h4 className="line-clamp-2 medium-16">{name}</h4>
        <p>
          {description && description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>
        <div className="flexBetween">
          <div className="flex gap-x-4 medium-16">
            <span>₦{new_price}.00</span>
            <span className="line-through text-secondary">₦{old_price}.00</span>
          </div>
          <RiShoppingBag2Line className="p-2 h-10 w-10 hover:text-secondary" />
        </div>
      </div>
    </Link>
  );
};

export default Item;
