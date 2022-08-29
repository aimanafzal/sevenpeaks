module.exports = (sequelize, Sequelize) => {
	const vehicle_Information = sequelize.define('vehicle_Information', {
	  vehicle_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	  },
	  current_longitude: Sequelize.STRING,
	  current_latitude: Sequelize.STRING, 
	  previous_longitude: Sequelize.STRING,
	  previous_latitude: Sequelize.STRING,
	  current_time: Sequelize.STRING,
	  previous_time: Sequelize.STRING
	});
	return vehicle_Information;
  };