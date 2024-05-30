import { TbTruckReturn } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";
import about from "../assets/stripe.svg";

const About = () => {
  return (
    <section className=" max-padd-container py-12 xl:py-32">
      {/* container */}
      <div className="flex flex-col gap-16 xl:gap-8 xl:flex-row">
        {/* left */}
        <div className="flex-1">
          <h3 className="h3 capitalize">
            Unveiling Our Products Key Feature&#39;s!
          </h3>
          <p className="py-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            voluptas necessitatibus eius reiciendis.
          </p>
          <div className="flex flex-col items-start gap-y-4">
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondary flexCenter rounded-md">
                <TbTruckReturn className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="medium-18">Easy Return Process</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
              </div>
            </div>
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondary flexCenter rounded-md">
                <RiSecurePaymentFill className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="medium-18">Secure Payment Options</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
              </div>
            </div>
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondary flexCenter rounded-md">
                <RiCustomerService2Fill className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="medium-18">24/7 Customer Support</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex-1 flexCenter">
          <div className="hidden md:flex">
            <img src={about} alt="" height={488} width={488} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
