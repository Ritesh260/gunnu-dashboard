import { useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaShieldAlt,
  FaUtensils,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res =
      await axios.post(
        "https://gunnu-dashboard.onrender.com/api/auth/login",
        form
      );

    localStorage.setItem(
      "token",
      res.data.token
    );

    navigate("/");
  } catch (error) {
    alert(
      "Invalid Email or Password"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gray-900 text-white p-12 relative">

          {/* Chef Illustration */}
          <div className="relative">

            {/* Head */}
            <div className="w-28 h-28 bg-orange-200 rounded-full mx-auto relative z-10"></div>

            {/* Chef Cap */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <div className="w-20 h-10 bg-white rounded-full"></div>
              <div className="w-28 h-10 bg-white rounded-full -mt-4"></div>
            </div>

            {/* Body */}
            <div className="w-44 h-52 bg-white rounded-3xl mt-4 mx-auto relative">

              {/* Buttons */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 space-y-3">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              </div>

              {/* Arms */}
              <div className="absolute top-12 -left-6 w-8 h-24 bg-orange-200 rounded-full rotate-12"></div>
              <div className="absolute top-12 -right-6 w-8 h-24 bg-orange-200 rounded-full -rotate-12"></div>

            </div>

          </div>

          <h1 className="text-4xl font-bold mt-10">
            Gunnu Admin
          </h1>

          <p className="text-gray-300 mt-3 text-center text-lg">
            Smart Restaurant Dashboard
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-10 lg:p-14">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center text-orange-500 mb-5">
            <FaUtensils size={42} />
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Login to continue admin panel
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Email Address
              </label>

              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl px-4">

                <FaEnvelope className="text-gray-500" />

                <input
                  type="email"
                  name="email"
                  placeholder="admin@gmail.com"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-transparent outline-none py-4"
                  required
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Password
              </label>

              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl px-4">

                <FaLock className="text-gray-500" />

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={
                    form.password
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-transparent outline-none py-4"
                  required
                />

              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  <FaSignInAlt />
                  Login Now
                </>
              )}
            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 flex justify-center lg:justify-start items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FaShieldAlt />
            Secure Admin Access
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;