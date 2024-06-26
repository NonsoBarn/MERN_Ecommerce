import logo from "../assets/BULOGO.png";
import listuser from "../assets/userad.png";
import AdminMenu from "./AdminMenu";

const Navbar = () => {
  return (
    <nav className="bg-white py-2 ring-1 ring-slate-900/5 relative">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 flexBetween">
        <div>
          <img src={logo} alt="logoicon" width={45} height={45} />
        </div>
        <div className="hidden sm:flex uppercase bold-22 text-white bg-secondary px-3 rounded-md tracking-widest line-clamp-1 max-xs:bold-18 max-xs:py-2 max-xs:px-1">
          Admin Panel
        </div>
        <div className="flex gap-4 items-center text-center">
          <img
            src={listuser}
            alt=""
            className="h-12 w-12 rounded-full hidden"
          />
          <AdminMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
