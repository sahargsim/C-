module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    category: {
      type: Sequelize.STRING
    }
  });

  return Product;
};