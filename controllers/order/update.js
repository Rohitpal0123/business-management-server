const Order = require("../../models/orders.model");

// Update order by id
class updateOrder {
    process = async (req, res) => { 
        try {
            const orderId = req.params.id;
            const updatedData = req.body;      
            
            const updatedOrder = await Order.update(updatedData, {
                where: {
                    id: orderId
                }
            });
            console.log("🚀 ~ updatedOrder:", updatedOrder[0]);
            
            if (updatedOrder[0] === 0) {
                throw new Error("Order not updated");
            }   

            res.status(200).json("Order updated successfully");

        } catch (error) {
            console.log("🚀 ~ error:", error);
            res.status(500).json({ error });
        }
    }
}               

module.exports = new updateOrder();