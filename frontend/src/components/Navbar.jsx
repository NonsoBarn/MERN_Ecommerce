/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles }) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink
        to={"/all"}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        All
      </NavLink>
      <NavLink
        to={"/groceries"}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Groceries
      </NavLink>
      <NavLink
        to={"/electronics"}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Electronics
      </NavLink>
      <NavLink
        to={"/miscellaneous"}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Miscellaneous
      </NavLink>
    </nav>
  );
};

export default Navbar;
