const Orders = require("../../models/orders.model");

// Create a new order
class createOrder {
  process = async (req, res) => {
    try {
      const { name, address, contactNumber, quantity, agreedRate } = req.body;
      const createOrder = await Orders.create({
        name: name,
        address: address,
        contactNumber: contactNumber,
        quantity: quantity,
        agreedRate: agreedRate,
      });
      console.log("🚀 ~ order:", createOrder);
      if (!createOrder) {
        throw new Error("Order not created");
      }
      res.status(200).json(createOrder);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(500).json({ error });
    }
  };
}

module.exports = new createOrder();
