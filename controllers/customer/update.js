const Customer = require("../../models/customers.model");

// Update customer by id
class updateCustomer {
  process = async (req, res) => {
    try {
      const customerId = req.params.id;
      const updatedData = req.body;

      const updatedCustomer = await Customer.update(updatedData, {
        where: {
          id: customerId,
        },
      });

      if (updatedCustomer[0] === 0) {
        throw new Error("Customer not updated");
      }

      res.status(200).json("Customer updated successfully");
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

module.exports = new updateCustomer();
