import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    console.log("login executed", formData);
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token); // Store token in local storage
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const signup = async () => {
    // console.log("signup executed", formData);
    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token); // Store token in local storage
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <section className="max-padd-container flexCenter flex-col pt-32 bg-primary">
      <div className="w-full max-w-[666px] h-[600px] bg-primary m-auto px-14 py-10 rounded-md">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state === "Sign Up" ? (
            <div className="flex flex-col gap-4">
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={changeHandler}
                placeholder="Your Name"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
              />
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={changeHandler}
                placeholder="Your Address"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm "
              />
              <input
                name="phone"
                type="number"
                value={formData.phone}
                onChange={changeHandler}
                placeholder="Your phone Number"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
              />
            </div>
          ) : (
            ""
          )}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Your Email"
            className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
            className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          className="btn-dark rounded-xl my-5 !py-1"
        >
          Continue
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-secondary underline cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-black">
            Create an account?
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="text-secondary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}

        <div className="flexStart mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, i agree the terms of use & privacy policy</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
