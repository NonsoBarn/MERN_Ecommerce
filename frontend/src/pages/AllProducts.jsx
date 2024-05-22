/* eslint-disable react/prop-types */
import { VscSettings } from "react-icons/vsc";
import Item from "../components/Item";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const AllProducts = ({ banner }) => {
  const { all_products } = useContext(ShopContext);
  // console.log(all_products);
  return (
    <section className="max-padd-container bg-primary">
      <div className="pt-6">
        <div>
          <img src={banner} alt="" className="block md-7 mx-auto" />
        </div>
        <div className=" flexBetween my-10 mx-2">
          <h5>
            <span className="font-bold"> showing 1-12</span>
            out of 36 products
          </h5>
          <Link to={"/"}>
            <VscSettings className="text-3xl bg-tertiary rounde-md h-10 w-10 p-2 text-white" />
          </Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32 ">
          {all_products.map((item) => {
            return (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })}
        </div>
        <div className="py-16 text-center">
          <button className="btn-dark rounded-xl">Load more</button>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
