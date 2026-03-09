import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CreateOrderPage = () => {
  const [userId, setUserId] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [foodItems, setFoodItems] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [orderStatus, setOrderStatus] = useState("Placed");
  const [orderDate, setOrderDate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/orders", {
        userId,
        restaurantName,
        restaurantId,
        foodItems,
        price: Number(price),
        totalAmount: Number(totalAmount),
        paymentStatus,
        orderStatus,
        orderDate,
      });

      toast.success("Order created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating order", error);
      toast.error("Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Create New Order
              </h2>

              <form onSubmit={handleSubmit}>

                {/* User ID */}
                <div className="form-control mb-4">
                  <label className="label-text mb-1">User ID :</label>
                  <input
                    type="text"
                    className="input input-bordered w-full px-4 py-2"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>

                {/* Restaurant Name */}
                <div className="form-control mb-4">
                  <label className="label-text mb-1">Restaurant Name :</label>
                  <input
                    type="text"
                    className="input input-bordered w-full px-4 py-2"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    required
                  />
                </div>

                {/* Restaurant ID */}
                <div className="form-control mb-4">
                  <label className="label-text mb-1">Restaurant ID :</label>
                  <input
                    type="text"
                    className="input input-bordered w-full px-4 py-2"
                    value={restaurantId}
                    onChange={(e) => setRestaurantId(e.target.value)}
                    required
                  />
                </div>

                {/* Food Items */}
                <div className="form-control mb-4">
                  <label className="label-text mb-1">Food Items :</label>
                  <input
                    type="text"
                    className="input input-bordered w-full px-4 py-2"
                    value={foodItems}
                    onChange={(e) => setFoodItems(e.target.value)}
                    required
                  />
                </div>

                {/* Price */}
                <div className="form-control mb-4">
                  <label className="label-text mb-1">Price :</label>
                  <input
                    type="number"
                    className="input input-bordered w-full px-4 py-2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                {/* Total Amount */}
                <div className="form-control mb-4">
                  <label className="label-text mb-1">Total Amount :</label>
                  <input
                    type="number"
                    className="input input-bordered w-full px-4 py-2"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    required
                  />
                </div>

                {/* Payment Status */}
                <div className="form-control mb-4">
                  <label className="label-text mb-1">Payment Status :</label>
                  <select
                    className="select select-bordered w-full px-4 py-2"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                {/* Order Status */}
                <div className="form-control mb-4">
                  <label className="label-text mb-1">Order Status :</label>
                  <select
                    className="select select-bordered w-full px-4 py-2"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {/* Order Date */}
                <div className="form-control mb-4">
                  <label className="label-text mb-1">Order Date :</label>
                  <input
                    type="date"
                    className="input input-bordered w-full px-4 py-2"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    required
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Order"}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;