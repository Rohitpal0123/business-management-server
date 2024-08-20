const Orders = require("../../models/orders.model");

// Get all orders
class getOrders {
    process = async (req, res) => {
        try {
            const orders = await Orders.findAll();
            res.status(200).json(orders);
        } catch (error) {
            console.log("🚀 ~ error:", error);
            res.status(500).json({ error });
        }
    };
}

module.exports = new getOrders();