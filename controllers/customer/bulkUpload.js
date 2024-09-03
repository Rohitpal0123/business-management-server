const Customer = require("../../models/customers.model");
const xlsx = require("xlsx");

class ImportCustomers {
  async convertExcelToJson(fileContent) {
    try {
      console.log("Second");
      const dataBuffer = Buffer.isBuffer(fileContent)
        ? fileContent
        : Buffer.from(fileContent);

      const workbook = xlsx.read(dataBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Use { header: 1 } option to treat the first row as headers
      const jsonData = xlsx.utils.sheet_to_json(sheet);
      console.log("🚀 ~ jsonData:", jsonData);

      return jsonData;
    } catch (error) {
      throw error;
    }
  }

  async insertMany(customers) {
    try {
      // Use Sequelize's bulkCreate method to insert multiple records at once
      const createdCustomers = await Customer.bulkCreate(customers);

      return createdCustomers;
    } catch (error) {
      throw error;
    }
  }

  process = async (req, res) => {
    try {
      console.log("zero");

      console.log("🚀 ~ req.file:", req.file);
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log("first");

      const fileContent = req.file.buffer;

      const jsonData = await this.convertExcelToJson(fileContent);

      console.log("three");

      const createdCustomers = await this.insertMany(jsonData);
      console.log("four");

      if (!createdCustomers) throw new Error("Customers not uploaded!");
      res.status(200).send(createdCustomers);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(500).send(error.message);
    }
  };
}

module.exports = new ImportCustomers();
