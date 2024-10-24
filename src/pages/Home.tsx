import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import ItemType from "../types/ItemType";
import OrderType from "../types/OrderType";
import axios from "axios";
import UserType from "../types/UserType";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  const [categoryCount, setCategoryCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  async function getCategories() {
    try {
      const apiResponse = await axios.get(
        "http://localhost:8080/categories",
        config
      );

      setCategories(apiResponse.data);
      setCategoryCount(categories.length);
    } catch (error) {
      alert("Categories not found: " + error);
    }
  }

  async function getItems() {
    try {
      const apiResponse = await axios.get(
        "http://localhost:8080/items",
        config
      );

      setItems(apiResponse.data);
      setItemCount(items.length);
    } catch (error) {
      alert("Items not found: " + error);
    }
  }

  async function getOrders() {
    try {
      const apiResponse = await axios.get(
        "http://localhost:8080/orders",
        config
      );

      setOrders(apiResponse.data);
      setOrderCount(orders.length);
    } catch (error) {
      alert("Orders not found: " + error);
    }
  }

  async function getUsers() {
    try {
      const apiResponse = await axios.get(
        "http://localhost:8080/users",
        config
      );

      setUsers(apiResponse.data);
      setUserCount(users.length);
    } catch (error) {
      alert("Users not found: " + error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getCategories();
      getItems();
      getOrders();
      getUsers();
    }
  }, [isAuthenticated]);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  return (
    <div className="container mx-auto mt-5 mb-5 ml-10 w-[1200px]">
      <h1 className="text-4xl font-bold underline mb-5 mt-5 text-violet-500">
        Dashboard
      </h1>
      <div className="flex items-center mb-5 space-x-5">
        {/* Category Card */}
        <div className="w-[250px] bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <h2 className="text-3xl font-bold mb-2">{categoryCount}</h2>
          <p className="text-lg">Categories</p>
        </div>

        {/* Item Card */}
        <div className="w-[250px] bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <h2 className="text-3xl font-bold mb-2">{itemCount}</h2>
          <p className="text-lg">Items</p>
        </div>

        {/* Order Card */}
        <div className="w-[250px] bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <h2 className="text-3xl font-bold mb-2">{orderCount}</h2>
          <p className="text-lg">Orders</p>
        </div>

        {/* User Card */}
        <div className="w-[250px] bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <h2 className="text-3xl font-bold mb-2">{userCount}</h2>
          <p className="text-lg">Users</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
