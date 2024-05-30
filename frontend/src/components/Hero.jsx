import { Link } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import herosvg from "../assets/hero.svg";

const Hero = () => {
  return (
    <section>
      <div className="relative max-padd-container bg-hero bg-cover bg-no-repeat h-[744px]">
        <div className="absolute top-24 xs:top-30 right-20 w-[600px] hidden md:flex">
          <img src={herosvg} alt="" />
        </div>

        <div className="relative top-24 xs:top-24">
          <h4 className="uppercase medium-18 tracking-wider">
            QUALITY BARGAINS
          </h4>
          <h2 className="h1 capitalize max-w-[40rem]">
            Discover Unbeatable Value{" "}
            <span className="text-secondary">with Every Purchase.</span> Start
            Saving Today!
          </h2>
          <p className="my-5 max-w-[33rem]">
            Find the Best Deals on Top-Quality Products. Shop Now and Enjoy
            Incredible Savings!
          </p>
          {/* buttons */}
          <div className="inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl">
            <div className="text-center regular-14 leading-tight pl-5">
              <h5 className="uppercase font-bold">10% off</h5>
              <p className="regular-14">Online Purchases</p>
            </div>
            <Link to={"/all"} className="btn-dark rounded-xl flexCenter !py-5">
              Shop now
            </Link>
          </div>
          {/* NewCollection */}
          <div className="mt-16">
            <RelatedProducts />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
