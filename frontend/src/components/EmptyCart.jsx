import { UilShoppingBag, UilArrowRight } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <section className="max-padd-container bg-primary rounded-3xl">
      <div className="cart-empty flex flex-row min-h-screen justify-center items-center pb-42">
        <div className="text-center max-w-sm p-6 ">
          <div className="relative flex items-center justify-center">
            <UilShoppingBag size={100} className="inline-flex items-center " />
            <span className="absolute right-20 top-9 rounded-full bg-secondary w-10 h-10 top pt-1  text-white font-mono text-2xl  leading-tight text-center mr-8">
              0
            </span>
          </div>

          <p className="pt-0 text-xl font-semibold">
            Your cart is currently empty.
          </p>
          <p className="mb-3 font-light text-sm  text-gray-500 ">
            Add some product to your cart. You wil find a lot of interesting
            products on our &quot;Product&quot; page
          </p>
          <div>
            <Link
              to="/all"
              className="inline-flex items-center py-3 mb-2 font-semibold text-white px-3 bg-tertiary hover:bg-gray-90 lg:w-fit mt-5"
            >
              Continue Shopping <UilArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmptyCart;
