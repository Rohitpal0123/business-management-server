const Customer = require("../../models/customers.model");

// Update customer by id
class updateCustomer {
  process = async (req, res) => {
    try {
      const customerId = req.params.id;
      console.log("🚀 ~ customerId:", customerId)
      const updatedData = req.body; 
      console.log("🚀 ~ updatedData:", updatedData)
      const updatedCustomer = await Customer.update(updatedData, {
        where: {
          id: customerId,
        },
      });
      console.log("🚀 ~ updatedCustomer:", updatedCustomer)

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
