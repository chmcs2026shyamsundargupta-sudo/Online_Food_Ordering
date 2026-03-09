import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    foodItems: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    orderStatus: {
        type: String,
        default: "placed"
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
},
{ timestamps: true });

const order = mongoose.model("Order", orderSchema);
export default order