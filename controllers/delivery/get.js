const Deliveries = require("../../models/deliveries.model");

// Get all deliveries
class getDeliveries {
    process = async (req, res) => {
        try {
            const deliveries = await Deliveries.findAll();
            res.status(200).send(deliveries);
        } catch (error) {
            res.status(500).json({ error });
        }
    };
}

module.exports = new getDeliveries();