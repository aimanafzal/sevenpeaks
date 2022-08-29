module.exports = (sequelize, Sequelize) => {
	const vehicle = sequelize.define('vehicle', {
	  id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	  },
	  registration_number: Sequelize.STRING,
	  vehicle_type: Sequelize.STRING,
	});
	return vehicle;
  };