const Customer = require("../../models/customers.model");

// Create a new customer
class addCustomer {
  process = async (req, res) => {
    try {
      const { name, address, contactNumber, quantity, agreedRate, isSpecialOrder } = req.body;
      const customer = await Customer.create({
        name: name,
        address: address,
        contactNumber: contactNumber,
        quantity: quantity,
        agreedRate: agreedRate,
        isSpecialOrder: isSpecialOrder
      });

      if (!customer) {
        throw new Error("Customer not created");
      }

      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

module.exports = new addCustomer();
