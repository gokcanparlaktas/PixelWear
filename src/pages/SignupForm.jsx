import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [roles, setRoles] = useState([]);
  const [storeFieldsVisible, setStoreFieldsVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/roles");
        setRoles(response.data);
        setValue("role_id", "3"); // Default role ID
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    const selectedRole = roles.find(
      (role) => role.id === parseInt(selectedRoleId, 10)
    );
    setStoreFieldsVisible(selectedRole && selectedRole.code === "store");
  };

  const onSubmit = async (data) => {
    try {
      const { role_id } = data;
      let postData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id,
      };

      if (role_id === "store") {
        postData.store = {
          name: data.storeName,
          phone: data.storePhone,
          tax_no: data.storeTaxNo,
          bank_account: data.storeBankAccount,
        };
      }

      await axiosInstance.post("/signup", postData);
      alert(
        "You need to click the link in the email to activate your account!"
      );
      history.goBack();
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url('/images/signup-img.jpg')` }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name *</label>
          <input
            {...register("name", { required: true, minLength: 3 })}
            className={`border p-2 w-full rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Full Name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              Name is required and must be at least 3 characters.
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email *</label>
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className={`border p-2 w-full rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              Email is required and must be valid.
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Password *</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
            className={`border p-2 w-full rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              Password must be at least 8 characters, including numbers, upper
              and lower case letters, and special characters.
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Confirm Password *</label>
          <input
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            })}
            className={`border p-2 w-full rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Role *</label>
          <select
            {...register("role_id", { required: true })}
            onChange={handleRoleChange}
            defaultValue="3"
            className={`border p-2 w-full rounded ${
              errors.role_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role_id && (
            <span className="text-red-500 text-sm">Role is required.</span>
          )}
        </div>

        {storeFieldsVisible && (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Store Name *</label>
              <input
                {...register("storeName", { required: true, minLength: 3 })}
                className={`border p-2 w-full rounded ${
                  errors.storeName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Store Name"
              />
              {errors.storeName && (
                <span className="text-red-500 text-sm">
                  Store Name is required and must be at least 3 characters.
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Store Phone *</label>
              <input
                {...register("storePhone", {
                  required: true,
                  pattern: /^(\+90|0)?5\d{2}\d{7}$/,
                })}
                className={`border p-2 w-full rounded ${
                  errors.storePhone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+90xxxxxxxxxx"
              />
              {errors.storePhone && (
                <span className="text-red-500 text-sm">
                  Store Phone is required and must be a valid Türkiye phone
                  number.
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Store Tax ID *</label>
              <input
                {...register("storeTaxNo", {
                  required: true,
                  pattern: /^T\d{4}V\d{6}$/,
                })}
                className={`border p-2 w-full rounded ${
                  errors.storeTaxNo ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="TXXXXVXXXXXX"
              />
              {errors.storeTaxNo && (
                <span className="text-red-500 text-sm">
                  Store Tax ID is required and must match the pattern
                  "TXXXXVXXXXXX".
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Store Bank Account *
              </label>
              <input
                {...register("storeBankAccount", { required: true })}
                className={`border p-2 w-full rounded ${
                  errors.storeBankAccount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Bank Account Number"
              />
              {errors.storeBankAccount && (
                <span className="text-red-500 text-sm">
                  Store Bank Account is required.
                </span>
              )}
            </div>
          </>
        )}

        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
          <Link to="/login" className="text-blue-500 hover:underline">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
