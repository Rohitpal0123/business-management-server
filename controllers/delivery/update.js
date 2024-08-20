const Deliveries = require("../../models/deliveries.model");

// Update delivery by customerId
class updateDelivery {
  process = async (req, res) => {
    try {
      const customerId = req.params.id;
      const { date } = req.body;
      const updatedData = req.body;

      const updatedDelivery = await Deliveries.update(updatedData, {
        where: {
          id: customerId,
          date: date,
        },
      });
      console.log("🚀 ~ updatedDelivery:", updatedDelivery)

      if (updatedDelivery[0] === 0) {
        throw new Error("Delivery not updated");
      }

      res.status(200).json("Delivery updated successfully");
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(500).json({ error });
    }
  };
}

module.exports = new updateDelivery();
