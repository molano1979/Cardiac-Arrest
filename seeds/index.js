const seedDatabase = require("./seed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedDatabase();

  process.exit(0);
};

seedAll();
