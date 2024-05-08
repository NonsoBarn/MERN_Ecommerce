import {
  RiYoutubeFill,
  RiInstagramFill,
  RiTwitterFill,
  RiFacebookFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const SocialIcons = () => {
  return (
    <div className="flex gap-6 pr-4 text-white">
      <Link
        to={""}
        className=" text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiYoutubeFill />
      </Link>
      <Link
        to={""}
        className=" text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiInstagramFill />
      </Link>
      <Link
        to={""}
        className=" text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiTwitterFill />
      </Link>
      <Link
        to={""}
        className=" text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiFacebookFill />
      </Link>
    </div>
  );
};

export default SocialIcons;
