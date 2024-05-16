import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
import userdummy from "../assets/dummy2.png";

const ListUser = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allusers")
      .then((res) => res.json())
      .then((date) => {
        setAllUsers(date);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_user = async (id) => {
    await fetch("http://localhost:4000/removeuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="P-2 box-border bg-white mb-0 rounded-sm w-full mt-5 lg:ml-5">
      <h4 className="bold-22 p-5 uppercase">Users List</h4>
      <div className="max-h-[77vh] overflow-auto px-4 text-center">
        <table className="w-full mx-auto">
          <thead>
            <tr className="bg-primary bold-14 sm:regular-22 text-start py-12">
              <th className="p-2">Products</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Category</th>
              <th className="p-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, i) => (
              <tr
                key={i}
                className="border-b border-slate-900/20 text-gray-20 p-6 medium-16"
              >
                <td className="flexCenter my-2">
                  <img
                    src={userdummy}
                    alt=""
                    height={55}
                    width={55}
                    className="rounded-lg ring-1 ring-slate-900/5"
                  />
                </td>
                <td>
                  <div className="line-clamp-3">{user.username}</div>
                </td>

                <td>{user.email}</td>
                <td>NIL</td>

                <td>
                  <div className="bold-22 pl-6 sm:pl-24">
                    <TbTrash
                      onClick={() => remove_user(user.id)}
                      className="cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUser;
