const Customer = require("../../models/customers.model");
// const Delivery = require("../../models/deliveries.model")
class DeleteCustomer {
  process = async (req, res) => {
    try {
      const { id } = req.params;

      // await Delivery.update(
      //   { customerId: null },
      //   { where: { customerId: id } }
      // );


      const deleteCustomer = await Customer.destroy({
        where: {
          id: id,
        },
      });
      console.log("🚀 ~ deleteCustomer:", deleteCustomer)

      if (deleteCustomer != 1) {
        throw new Error(`Customer with id${id} not deleted !`)
      }

      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.sendStatus(400).send(error.message);

    }
  };
}

module.exports = new DeleteCustomer();
