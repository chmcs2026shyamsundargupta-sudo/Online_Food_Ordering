import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import OrderCard from "../components/OrderCard.jsx";
import OrderNotFound from "../components/OrderNotFound.jsx";

const HomePage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [restaurantFilter, setRestaurantFilter] = useState("");
  const [foodFilter, setFoodFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
        setFilteredOrders(res.data);
      } catch (error) {
        console.log("Error fetching orders", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🔎 Search + Filters
  useEffect(() => {
    let result = orders;

    if (search !== "") {
      result = result.filter(
        (order) =>
          order.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
          order.foodItems.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (restaurantFilter !== "") {
      result = result.filter(
        (order) => order.restaurantName === restaurantFilter
      );
    }

    if (foodFilter !== "") {
      result = result.filter(
        (order) => order.foodItems === foodFilter
      );
    }

    setFilteredOrders(result);
  }, [search, restaurantFilter, foodFilter, orders]);

  // Unique Restaurants
  const restaurants = [...new Set(orders.map((o) => o.restaurantName))];

  // Unique Food Items
  const foods = [...new Set(orders.map((o) => o.foodItems))];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {/* SEARCH + FILTER */}
        <div className="flex gap-4 mb-6 flex-wrap">

          {/* Search */}
          <input
            type="text"
            placeholder="Search restaurant or food..."
            className="input input-bordered"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Restaurant Filter */}
          <select
            className="select select-bordered"
            value={restaurantFilter}
            onChange={(e) => setRestaurantFilter(e.target.value)}
          >
            <option value="">All Restaurants</option>

            {restaurants.map((r, i) => (
              <option key={i}>{r}</option>
            ))}
          </select>

          {/* Food Items Filter */}
          <select
            className="select select-bordered"
            value={foodFilter}
            onChange={(e) => setFoodFilter(e.target.value)}
          >
            <option value="">All Food Items</option>

            {foods.map((f, i) => (
              <option key={i}>{f}</option>
            ))}
          </select>

        </div>

        {loading && (
          <div className="text-center text-primary py-10">
            Loading orders...
          </div>
        )}

        {!loading && filteredOrders.length === 0 && <OrderNotFound />}

        {!loading && filteredOrders.length > 0 && (
          <div className="flex gap-6 overflow-x-auto pb-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                setOrders={setOrders}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;