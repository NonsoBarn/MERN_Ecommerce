import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import buy from "../assets/buy.svg";

const Offer = () => {
  return (
    <section className="max-padd-container  bg-center bg-cover w-full flex flex-col md:flex-row">
      <div className="px-4 py-16 md:py-24 lg:py-44">
        <h2 className="h2">Spring sale 50% off!</h2>
        <h3 className="medium-32 capitalize font-normal">
          Grab <span className="text-secondary">Your Favourite</span> Before
          They&#39;re Gone!
        </h3>
        <Link
          to={"/"}
          className="pl-6 text-white bg-tertiary rounded-full flexBetween gap-x-2 medium-16 w-44 mt-10 group"
        >
          Go to shop
          <FaArrowRightLong className="text-xl bg-secondary text-primary rounded-full h-12 w-12 p-4 group-hover:rotate-45 transition-all duration-500 border-2 border-white" />
        </Link>
      </div>
      <div className="hidden lg:flex">
        <img src={buy} alt="" className="w-[600px] pt-20" />
      </div>
    </section>
  );
};

export default Offer;
