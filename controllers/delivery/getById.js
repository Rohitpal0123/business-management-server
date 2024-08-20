const Deliveries = require("../../models/deliveries.model");

// Get single delivery by customerId
class getDeliveryById {
    process = async (req, res) => {
        try {
            const delivery = await Deliveries.findOne({
                where: {
                    customerId: req.params.id,
                },
            });
            res.status(200).send(delivery);
        } catch (error) {
            res.status(500).json({ error });
        }
    };
}

module.exports = new getDeliveryById();