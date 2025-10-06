// // import { createContext, useState, useEffect } from "react";
// // import api from "../utils/api";

// // export const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       api
// //         .get("/auth/me")
// //         .then((res) => setUser(res.data.user))
// //         .catch(() => localStorage.removeItem("token"))
// //         .finally(() => setLoading(false));

// //       console.log(user);
// //     } else {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const login = async (email, password) => {
// //     const res = await api.post("/auth/login", { email, password });
// //     localStorage.setItem("token", res.data.token);
// //     setUser(res.data.user);
// //   };

// //   const register = async (name, email, password, secondaryEmail, role) => {
// //     // console.log(name);
// //     const res = await api.post("/auth/signup", {
// //       name,
// //       email,
// //       password,
// //       role,
// //     });
// //     console.log(res);
// //     localStorage.setItem("token", res.data.token);
// //     setUser(res.data.user);
// //   };

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// import { createContext, useState, useEffect } from "react";
// import api from "../utils/api";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [cart, setCart] = useState([]); // 🛒 Cart state
//   const [loading, setLoading] = useState(true);

//   // --- USER AUTH HANDLING ---
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       api
//         .get("/auth/me")
//         .then((res) => setUser(res.data.user))
//         .catch(() => localStorage.removeItem("token"))
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email, password) => {
//     const res = await api.post("/auth/login", { email, password });
//     localStorage.setItem("token", res.data.token);
//     setUser(res.data.user);
//   };

//   const register = async (name, email, password, role) => {
//     const res = await api.post("/auth/signup", {
//       name,
//       email,
//       password,
//       role,
//     });
//     localStorage.setItem("token", res.data.token);
//     setUser(res.data.user);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setCart([]); // clear cart on logout
//   };

//   // --- 🛒 CART HANDLING FUNCTIONS ---
//   const addToCart = (item) => {
//     setCart((prevCart) => {
//       const existing = prevCart.find((i) => i._id === item._id);
//       if (existing) {
//         // If item already exists, just increment quantity
//         return prevCart.map((i) =>
//           i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       } else {
//         // Add new item to cart with quantity 1
//         return [...prevCart, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== id));
//   };

//   const updateQuantity = (id, delta) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item._id === id
//             ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const clearCart = () => setCart([]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         register,
//         logout,
//         loading,
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🛒 NEW: cart state
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // 🛒 ADD: Cart handlers
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i._id === item._id);
      if (existing) {
        return prevCart.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (name, email, password, secondaryEmail, role) => {
    const res = await api.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCart([]); // clear cart on logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
