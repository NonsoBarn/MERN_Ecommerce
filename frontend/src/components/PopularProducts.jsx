// import POPULAR from "../assets/popular";
import { useState, useEffect } from "react";
import Item from "./Item";
const PopularProducts = () => {
  const [popular_products, setPopular_products] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularproducts")
      .then((response) => response.json())
      .then((data) => setPopular_products(data));
  }, []);

  return (
    <section className="max-padd-container bg-primary p-12 xl:py-28">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="h3">Popular Products</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          inventore velit itaque tempora quidem facilis quaerat.
        </p>
      </div>
      {/* Container */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32">
        {popular_products.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
