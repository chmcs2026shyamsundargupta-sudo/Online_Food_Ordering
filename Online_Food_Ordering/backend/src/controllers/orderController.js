import Order from "../models/order.js";

export async function getAllOrders(_, res) {
    try {
        const orders = await Order.find().sort({ orderDate: -1 })
        res.status(200).json(orders)
    } catch (error) {
        console.error("Error in getAllOrders controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}

export async function getOrderById(req, res) {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) return res.status(404).json({ message: "Order not found"})
        res.status(200).json(order)
    } catch (error) {
        console.error("Error in getOrderById controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}

export async function createOrder(req, res) {
    try {
        const { userId, restaurantName, restaurantId, foodItems, price, totalAmount} = req.body

        if (!userId || !restaurantName || !restaurantId || !foodItems || !price || !totalAmount){
            return res.status(404).json({message: "All fields are required"})
        }

        const order = new Order({ userId, restaurantName, restaurantId, foodItems, price, totalAmount})
        const savedOrder = await order.save()
        res.status(201).json({ savedOrder })
    } catch (error) {
        console.error("Error in createOrder controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}

export async function updateOrder(req, res) {
    try {
        const { userId, restaurantName, restaurantId, foodItems, price, totalAmount, paymentStatus, orderStatus } = req.body

        const updatedOrder = await 
        Order.findByIdAndUpdate(req.params.id, 
        { userId, restaurantName, restaurantId, foodItems, price, totalAmount, paymentStatus, orderStatus}, { new: true })
        if (!updatedOrder) return res.status(404).json({ message: "Order not found"})
        res.status(200).json(updatedOrder)
    } catch (error) {
        console.error("Error in updateOrder controller", error)
        res.status(500).json ({ message: "Internal server error"})
    }
}

export async function deleteOrder(req, res) {
    try {
        const deletedOrder = await
        Order.findByIdAndDelete(req.params.id)
        if (!deletedOrder) return res.status(404).json({message: "Order not found"})
        res.status(200).json({ message : "Order deleted succesfully"})
    } catch (error) {
        console.error("Error in deleteOrder controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}