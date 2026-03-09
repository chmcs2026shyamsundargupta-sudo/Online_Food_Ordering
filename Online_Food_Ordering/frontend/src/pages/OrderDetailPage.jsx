import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const OrderDetailPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order", error);
        toast.error("Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await api.delete(`/orders/${id}`);
      toast.success("Order deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting order", error);
      toast.error("Failed to delete order");
    }
  };

  const handleSave = async () => {
    if (!order.userId.trim() || !order.restaurantName.trim()) {
      toast.error("UserId and Restaurant Name required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/orders/${id}`, {
        ...order,
        price: Number(order.price),
        totalAmount: Number(order.totalAmount),
      });

      toast.success("Order updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating order", error);
      toast.error("Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" /> Back
            </Link>

            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" /> Delete
            </button>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body space-y-4">

              {/* User ID */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">User ID</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={order.userId}
                  onChange={(e) =>
                    setOrder({ ...order, userId: e.target.value })
                  }
                />
              </div>

              {/* Restaurant Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Restaurant Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={order.restaurantName}
                  onChange={(e) =>
                    setOrder({ ...order, restaurantName: e.target.value })
                  }
                />
              </div>

              {/* Restaurant ID */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Restaurant ID</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={order.restaurantId}
                  onChange={(e) =>
                    setOrder({ ...order, restaurantId: e.target.value })
                  }
                />
              </div>

              {/* Food Items */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Food Items</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={order.foodItems}
                  onChange={(e) =>
                    setOrder({ ...order, foodItems: e.target.value })
                  }
                />
              </div>

              {/* Price */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={order.price}
                  onChange={(e) =>
                    setOrder({ ...order, price: e.target.value })
                  }
                />
              </div>

              {/* Total Amount */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Total Amount</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={order.totalAmount}
                  onChange={(e) =>
                    setOrder({ ...order, totalAmount: e.target.value })
                  }
                />
              </div>

              {/* Payment Status */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Payment Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={order.paymentStatus}
                  onChange={(e) =>
                    setOrder({ ...order, paymentStatus: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              {/* Order Status */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Order Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={order.orderStatus}
                  onChange={(e) =>
                    setOrder({ ...order, orderStatus: e.target.value })
                  }
                >
                  <option value="Placed">Placed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {/* Order Date */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Order Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={order.orderDate?.substring(0, 10)}
                  onChange={(e) =>
                    setOrder({ ...order, orderDate: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end pt-4">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;