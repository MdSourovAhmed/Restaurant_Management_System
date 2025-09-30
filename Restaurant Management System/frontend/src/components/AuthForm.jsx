// import { useState, useContext } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";

// // console.log(api);

// const AuthForm = ({ type }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     secondaryEmail: "",
//   });
//   const [error, setError] = useState(null);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = type === "signup" ? "/auth/signup" : "/auth/login";
//       const payload =
//         type === "signup"
//           ? {
//               name: formData.name,
//               email: formData.email,
//               password: formData.password,
//               secondaryEmail: formData.secondaryEmail,
//               role: "user",
//             }
//           : { email: formData.email, password: formData.password };
//       // console.log(payload);
//       const response = await api.post(endpoint, payload);
//       // console.log(response)
//       login(response.data.token);
//       // console.log(response.data);
//       if (response.data.user && response.data.user.role === "admin")
//         navigate("/admin");
//       else navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || `Failed to ${type}`);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto"
//     >
//       <h2 className="text-2xl font-bold mb-4">
//         {type === "signup" ? "Sign Up" : "Login"}
//       </h2>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       {type === "signup" && (
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//       )}
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password</label>
//         <input
//           type="password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       {type === "signup" && (
//         <div className="mb-4">
//           <label className="block text-gray-700">
//             Secondary Email (Optional)
//           </label>
//           <input
//             type="email"
//             value={formData.secondaryEmail}
//             onChange={(e) =>
//               setFormData({ ...formData, secondaryEmail: e.target.value })
//             }
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       )}
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         {type === "signup" ? "Sign Up" : "Login"}
//       </button>
//       {type === "login" && (
//         <div className="mt-4 text-sm">
//           <a href="/forgot-password" className="text-blue-500 hover:underline">
//             Forgot Password?
//           </a>
//           <br />
//           <a href="/recover-username" className="text-blue-500 hover:underline">
//             Forgot Username?
//           </a>
//         </div>
//       )}
//     </form>
//   );
// };

// export default AuthForm;

import { useState } from "react";

function AuthForm({ onSubmit, isLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Debug: Log form data on every input change
    console.log("Form input changed:", {
      name: e.target.name,
      value: e.target.value,
      currentFormData: { ...formData, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Debug: Log form data on submit
    console.log("Form submitted:", formData);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message);
      // Debug: Log error if submission fails
      console.log("Submission error:", err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
    >
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!isLogin && (
        <div>
          <label className="block text-gray-600 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
            required={!isLogin}
          />
        </div>
      )}
      <div>
        <label className="block text-gray-600 dark:text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
          required
        />
      </div>
      <div>
        <label className="block text-gray-600 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
          required
        />
      </div>
      {!isLogin && (
        <>
          {/* <div>
            <label className="block text-gray-600 dark:text-gray-300">
              Secondary Email (Optional)
            </label>
            <input
              type="text"
              name="secondaryEmail"
              value={formData.secondaryEmail}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
              //  required={!isLogin}
            />
          </div> */}
          <div>
            {/* <label className="block text-gray-600 dark:text-gray-300">
              Secondary Email (Optional)
            </label> */}
            <input
              type="text"
              name="role"
              value={(formData.role = "user")}
              // onChange={handleChange}
              className="hidden w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
              //  required={!isLogin}
            />
          </div>
        </>
      )}
      <button
        type="submit"
        className="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
}

export default AuthForm;
