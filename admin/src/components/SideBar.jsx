import { Link } from "react-router-dom";

import { VscFolderLibrary } from "react-icons/vsc";
import { IoCartSharp } from "react-icons/io5";
import { AiFillFileAdd } from "react-icons/ai";

const SideBar = () => {
  return (
    <div className="py-7 flex justify-center gap-x-2 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6">
      {/* <Link to={"/listuser"}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-12 w-36 xs:w-44 medium-14 xs:medium-16">
          <img src={listuser} alt="" height={40} width={40} />
          <span>User List</span>
        </button>
      </Link> */}

      <Link to={"/listorder"}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-12 w-36 xs:w-44 medium-14 xs:medium-16">
          <IoCartSharp className="text-4xl" />
          <span>Order List</span>
        </button>
      </Link>

      <Link to={"/addproduct"}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-12 w-36 xs:w-44 medium-14 xs:medium-16">
          <AiFillFileAdd className="text-4xl" />

          <span>Add Product</span>
        </button>
      </Link>
      <Link to={"/listproduct"}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-12 w-36 xs:w-44 medium-14 xs:medium-16">
          <VscFolderLibrary className="text-4xl" />
          <span>Product List</span>
        </button>
      </Link>
    </div>
  );
};

export default SideBar;
