import { Link } from "react-router-dom";
import logo from "../assets/BULOGO.png";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
const Footer = () => {
  return (
    <footer className="max-padd-container bg-tertiary py-8">
      <div className="flexCenter flex-col gap-y-4">
        {/* logo */}
        <Link to={"/"} className="flex items-center ga-x-2">
          <img src={logo} alt="logoimg" height={41} width={41} />
          <span className="text-white pl-2 pt-5 bold-24 hidden xs:flex">
            BabcockUniversity Mall
          </span>
        </Link>
        {/* nav */}
        <div className="py-4">
          <Navbar
            containerStyles={
              "flex gap-x-5 xl:gap-x-10 text-white medium-15 rounded-full px-2 py-1"
            }
          />
        </div>
        <SocialIcons />
        <hr className="h-[1px] w-2/3 my-3" />
        <div className="text-white">
          Copyright &copy; BUMall | All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
