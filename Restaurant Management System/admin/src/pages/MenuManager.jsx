import React, { useState, useEffect } from "react";
import api from "../utils/api";
import MenuForm from "./Forms/MenuForm";
import MenuItemCard from "../components/MenuItemCard";

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get("/menu");
      setMenuItems(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    // console.asser.log("Clicked on id: ", id);
    try {
      const response = await api.delete(`/menu/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  return (
    // <div className="container mx-auto p-6 max-w-7xl bg-gray-50 rounded-lg">
    <div>
      <h2 className="text-3xl font-bold mb-6">Menu Management</h2>
      <MenuForm
        fetchMenuItems={fetchMenuItems}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {/* <div> */}
          {/* <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
          {menuItems.map((item) => (
            <MenuItemCard
              item={item}
              key={item._id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuManager;
