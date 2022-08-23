module.exports = (sequelize, type) => {
	return sequelize.define('Vehicle_Information', {
	  vehicle_id: {
		type: type.INTEGER,
		primaryKey: true,
		autoIncrement: true
	  },
	  vehicle_location: type.STRING,
	  current_location: type.STRING,
	  last_location: type.STRING,
	  current_time: type.STRING,
	  previous_time: type.STRING
	});
  };