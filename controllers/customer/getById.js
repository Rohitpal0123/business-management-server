const Customer = require("../../models/customers.model");

// Get single customer by id
class getCustomerById {
  process = async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findOne({ where: { id: customerId } });
      if (!customer) {
        throw new Error("Customer not found");
      }
      res.status(200).send(customer);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

module.exports = new getCustomerById();
