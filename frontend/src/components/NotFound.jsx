// import backdrop from "../assets/backdrop.png";
import { Link } from "react-router-dom";
import { UilArrowRight } from "@iconscout/react-unicons";
const NotFound = () => {
  return (
    <section className="max-padd-container bg-primary rounded-3xl">
      <div>
        <div className="flex flex-col justify-center items-center h-screen pb-20 px-10">
          <h3 className="text-9xl font-bold text-secondary">404</h3>
          <p className="pt-3 text-xl">The page you requested does not exist.</p>
          <Link
            to="/"
            className="bg-tertiary hover:bg-gray-90 flex py-3 mb-2 font-semibold text-white px-4  lg:w-fit mt-10"
          >
            Home
            <UilArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
