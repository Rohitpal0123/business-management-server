const Deliveries = require("../../models/deliveries.model");
const Customer = require("../../models/customers.model");

// Add new delivery
class addDelivery {
    process = async (req, res) => {
        try {
            const { customerId, date, emptyBottles, filledBottles } = req.body;
            const delivery = await Deliveries.create({ 
                customerId: customerId,
                date: date,
                emptyBottles: emptyBottles,
                filledBottles: filledBottles
            });
            console.log("🚀 ~ delivery:", delivery)
            if (!delivery) {
                throw new Error("Delivery not created");
            }
            res.status(200).send(delivery);
        } catch (error) {
            console.log("🚀 ~ error:", error);
            res.status(500).json({ error });
        }
    }
}

module.exports = new addDelivery();