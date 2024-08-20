// models/index.js (or models/associations.js)

const Customer = require('./customers.model');
const Delivery = require('./deliveries.model');

// Define associations
Customer.hasMany(Delivery, {
  foreignKey: 'customerId',
  as: 'deliveries', // This alias can be used to include related deliveries when querying customers
});

Delivery.belongsTo(Customer, {
  foreignKey: 'customerId',
  as: 'customer',
});

// Export models with associations
module.exports = {
  Customer,
  Delivery,
};
