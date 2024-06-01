/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

const AdminMenu = ({ containerStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {localStorage.getItem("auth-token") ? (
        <NavLink
          onClick={() => {
            localStorage.removeItem("auth-token");
            window.location.replace("/");
          }}
          to={"/login"}
          className={"btn-secondary flexCenter gap-x-2 medium-16 rounded-xl"}
        >
          LogOut
        </NavLink>
      ) : (
        <NavLink
          to={"/login"}
          className={"btn-secondary flexCenter gap-x-2 medium-16 rounded-xl"}
        >
          Login
        </NavLink>
      )}
    </div>
  );
};

export default AdminMenu;
