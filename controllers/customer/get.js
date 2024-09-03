const Customer = require("../../models/customers.model");

// Get all customers
class getCustomer {
  process = async (req, res) => {
    try {
      console.log("first")
      const customers = await Customer.findAll();

      if (customers.length === 0) {
        throw new Error("Customers not found");
      }

      res.status(200).send(customers);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new getCustomer();
