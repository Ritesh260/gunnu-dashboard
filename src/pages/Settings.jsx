import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaSave,
  FaSignOutAlt,
  FaCamera,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const [preview, setPreview] =
    useState("");

  const [file, setFile] =
    useState(null);

  const [pass, setPass] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

 const fetchProfile = async () => {
  try {
    const res = await axios.get(
      "https://gunnu-dashboard.onrender.com/api/settings/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      setProfile(res.data.admin);
      setPreview(res.data.admin.image || "");
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleImage = (e) => {
    const selected =
      e.target.files[0];

    if (!selected) return;

    setFile(selected);

    setPreview(
      URL.createObjectURL(
        selected
      )
    );
  };

  const updateProfile =
    async () => {
      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "name",
          profile.name
        );
        formData.append(
          "email",
          profile.email
        );
        formData.append(
          "phone",
          profile.phone
        );

        if (file) {
          formData.append(
            "image",
            file
          );
        }

        await axios.put(
         "https://gunnu-dashboard.onrender.com/api/settings/profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Profile Updated Successfully"
        );
      } catch (error) {
        alert(
          "Update Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  const changePassword =
    async () => {
      try {
        await axios.put(
          "http://gunnu-dashboard.onrender.com/api/settings/password",
          pass,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Password Changed Successfully"
        );

        setPass({
          currentPassword:
            "",
          newPassword: "",
        });
      } catch (error) {
        alert(
          "Password Change Failed"
        );
      }
    };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );
    navigate("/login");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-950 min-h-screen">

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your
          profile &
          security
        </p>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">

        {/* LEFT PROFILE CARD */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6">

          <div className="flex flex-col items-center">

            {/* Image */}
            <div className="relative">

              {preview ? (
                <img
                  src={
                    preview
                  }
                  alt=""
                  className="w-32 h-32 rounded-full object-cover border-4 border-orange-500"
                />
              ) : (
                <FaUserCircle className="text-gray-300 text-[130px]" />
              )}

              <label className="absolute bottom-1 right-1 bg-orange-500 text-white p-3 rounded-full cursor-pointer hover:bg-orange-600 transition">

                <FaCamera />

                <input
                  type="file"
                  className="hidden"
                  onChange={
                    handleImage
                  }
                />

              </label>

            </div>

            <h2 className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
              {
                profile.name ||
                "Admin User"
              }
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {
                profile.email ||
                "admin@gmail.com"
              }
            </p>

            <button
              onClick={
                logout
              }
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="xl:col-span-2 space-y-6">

          {/* PROFILE FORM */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
              Admin Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Full Name
                </label>

                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 rounded-xl">
                  <FaUser className="text-gray-500" />

                  <input
                    type="text"
                    value={
                      profile.name
                    }
                    onChange={(
                      e
                    ) =>
                      setProfile(
                        {
                          ...profile,
                          name: e
                            .target
                            .value,
                        }
                      )
                    }
                    className="w-full bg-transparent py-4 outline-none"
                    placeholder="Enter Name"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email
                </label>

                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 rounded-xl">
                  <FaEnvelope className="text-gray-500" />

                  <input
                    type="email"
                    value={
                      profile.email
                    }
                    onChange={(
                      e
                    ) =>
                      setProfile(
                        {
                          ...profile,
                          email:
                            e
                              .target
                              .value,
                        }
                      )
                    }
                    className="w-full bg-transparent py-4 outline-none"
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  Phone
                </label>

                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 rounded-xl">
                  <FaPhoneAlt className="text-gray-500" />

                  <input
                    type="text"
                    value={
                      profile.phone
                    }
                    onChange={(
                      e
                    ) =>
                      setProfile(
                        {
                          ...profile,
                          phone:
                            e
                              .target
                              .value,
                        }
                      )
                    }
                    className="w-full bg-transparent py-4 outline-none"
                    placeholder="Enter Phone"
                  />
                </div>
              </div>

            </div>

            <button
              onClick={
                updateProfile
              }
              disabled={
                loading
              }
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
            >
              <FaSave />
              {loading
                ? "Saving..."
                : "Save Profile"}
            </button>

          </div>

          {/* PASSWORD */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
              Change Password
            </h2>

            <div className="space-y-4">

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Current Password
                </label>

                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 rounded-xl">
                  <FaLock className="text-gray-500" />

                  <input
                    type="password"
                    value={
                      pass.currentPassword
                    }
                    onChange={(
                      e
                    ) =>
                      setPass({
                        ...pass,
                        currentPassword:
                          e
                            .target
                            .value,
                      })
                    }
                    className="w-full bg-transparent py-4 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  New Password
                </label>

                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 rounded-xl">
                  <FaShieldAlt className="text-gray-500" />

                  <input
                    type="password"
                    value={
                      pass.newPassword
                    }
                    onChange={(
                      e
                    ) =>
                      setPass({
                        ...pass,
                        newPassword:
                          e
                            .target
                            .value,
                      })
                    }
                    className="w-full bg-transparent py-4 outline-none"
                  />
                </div>
              </div>

            </div>

            <button
              onClick={
                changePassword
              }
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Update Password
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;