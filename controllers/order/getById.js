const Orders = require("../../models/orders.model");

// Get single order by id
class getOrderById {
    process = async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Orders.findOne({ where: { id } });
            res.status(200).json(order);
        } catch (error) {
            console.log("🚀 ~ error:", error);
            res.status(500).json({ error });
        }
    };
}

module.exports = new getOrderById();