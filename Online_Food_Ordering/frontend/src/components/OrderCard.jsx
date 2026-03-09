import { Link, useLocation } from "react-router-dom";
import { Edit2, Trash2, Store, Utensils, IndianRupee } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const OrderCard = ({ order, setOrders }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === `/orders/${order._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/orders/${order._id}`);
      setOrders((prev) => prev.filter((o) => o._id !== order._id));
      toast.success("Order deleted successfully");
    } catch (error) {
      toast.error("Failed to delete order");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Link
        to={`/orders/${order._id}`}
        className={`block rounded-xl bg-secondary-focus p-4 border transition-all duration-200
        ${isActive ? "border-primary shadow-lg" : "border-base-300"}
        hover:border-primary hover:shadow-xl w-80`}
      >
        <div className="flex justify-between items-start">
          <p className="text-xs text-base-content/60 truncate">{order._id}</p>
          <span
            className={`badge ${
              order.orderStatus === "Delivered"
                ? "badge-success"
                : "badge-warning"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          
          {/* Restaurant Name */}
          <div className="flex items-center gap-2">
            <Store className="size-4 text-primary" />
            <p className="font-medium line-clamp-1">{order.restaurantName}</p>
          </div>

          {/* Food Items */}
          <div className="flex items-center gap-2 text-base-content/70">
            <Utensils className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">{order.foodItems}</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 text-base-content/70">
            <IndianRupee className="size-4 text-primary" />
            <p className="text-sm">₹{order.totalAmount}</p>
          </div>

        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-base-content/60 text-sm">
            {new Date(order.orderDate).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-4">
            <div className="tooltip tooltip-warning" data-tip="Edit order">
              <Edit2 className="size-4 text-warning hover:scale-110 transition" />
            </div>

            <div className="tooltip tooltip-error" data-tip="Delete order">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="text-error hover:scale-110 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Order
            </h3>

            <p className="py-4 text-base-content/70">
              Are you sure you want to delete
              <span className="font-semibold text-base-content">
                {" "}
                "{order.restaurantName}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default OrderCard;