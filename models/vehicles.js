module.exports = (sequelize, type) => {
	return sequelize.define('Vehicles', {
	  id: {
		type: type.INTEGER,
		primaryKey: true,
		autoIncrement: true
	  },
	  vehicle_number: type.STRING,
	  vehicle_type: type.STRING,
	});
  };