import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/BULOGO.png";

import { FaRegUserCircle } from "react-icons/fa";
import Navbar from "./Navbar";
import { MdMenu, MdClose } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext";

import UserMenu from "./UserMenu";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
    if (userMenuOpened === true) {
      setUserMenuOpened(false);
    }
  };

  const toggleUserMenu = () => {
    setUserMenuOpened(!userMenuOpened);
    if (menuOpened === true) {
      setMenuOpened(false);
    }
  };

  const { getTotalCartItems } = useContext(ShopContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        //close the menue if open when screen scrolling occurs
        if (menuOpened) {
          setMenuOpened(false);
        }
        if (userMenuOpened) {
          setUserMenuOpened(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    // close up event listener with component unmount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpened, userMenuOpened]);

  return (
    <header className="max-padd-container w-full z-50">
      <div className="flexBetween py-3">
        {/* logo */}
        <Link to={"/"} className="flex items-center ga-x-2">
          <img src={logo} alt="logoimg" height={41} width={41} />
          <span className="pl-2 pt-5 bold-24 hidden xs:flex">
            BabcockUniversity Mall
          </span>
        </Link>
        {/* Nav & Buttons */}
        <div className="flexCenter gap-x-12">
          {/* Desktop navbar */}
          <div>
            <Navbar
              containerStyles={
                "hidden xl:flex gap-x-5 xl xl:gap-x-10 medium-15 rounded-full px-2 py-1"
              }
            />
          </div>

          {/* mobile navbar */}
          <div>
            <Navbar
              containerStyles={`${
                menuOpened
                  ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50"
                  : "flex items-start flex-col gap-y-12 fixed top-20  p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50 -right-[100%]"
              }`}
            />
          </div>

          <div>
            <UserMenu
              containerStyles={`${
                userMenuOpened
                  ? "flex items-center flex-col gap-y-12 fixed top-20 right-8 p-5 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50"
                  : "flex items-center flex-col gap-y-12 fixed top-20  p-5 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50 -right-[100%]"
              }`}
            />
          </div>
          {/* buttons */}
          <div className="flexBetween gap-x-3 sm:gap-x-2 bold-16">
            {!menuOpened ? (
              <MdMenu
                className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
                onClick={toggleMenu}
              />
            ) : (
              <MdClose
                className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
                onClick={toggleMenu}
              />
            )}
            <div className="flexBetween sm:gap-x-0">
              <NavLink to={"/cart-page"} className={`flex`}>
                <RiShoppingCart2Line className="p-2 h-10 w-10 hover:text-secondary" />
                <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-primary medium-14 -top-2 right-3">
                  {getTotalCartItems()}
                </span>
              </NavLink>

              {/* User  */}
              <div>
                <FaRegUserCircle
                  className="p-2 h-10 w-10 hover:text-secondary"
                  onClick={toggleUserMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
