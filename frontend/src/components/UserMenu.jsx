/* eslint-disable react/prop-types */
import user from "../assets/user.svg";
import logout from "../assets/logout.svg";
import { NavLink, Link } from "react-router-dom";

const UserMenu = ({ containerStyles }) => {
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
          <img src={logout} alt="" height={19} width={19} />
          LogOut
        </NavLink>
      ) : (
        <NavLink
          to={"/login"}
          className={"btn-secondary flexCenter gap-x-2 medium-16 rounded-xl"}
        >
          <img src={user} alt="" height={19} width={19} />
          Login
        </NavLink>
      )}

      <Link to="/user-page">Profile</Link>
    </div>
  );
};

export default UserMenu;
