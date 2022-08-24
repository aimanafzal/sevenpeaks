const db = require("../models");
const vehicles = db.vehicles;
const vehicleInformation = db.vehicleInformation
const Op = db.Sequelize.Op;

// Register a vehicle
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Registering the vehicle 
  const vehicle = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  // Save the vehicle in the database
  vehicles.create(vehicle)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the vehicle."
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
};
// Find a single record with an id
exports.findOne = (req, res) => {
	exports.findOne = (req, res) => {
		const id = req.params.id;
		vehicle.findByPk(id)
		  .then(data => {
			if (data) {
			  res.send(data);
			} else {
			  res.status(404).send({
				message: `Cannot find Tutorial with id=${id}.`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: "Error retrieving Tutorial with id=" + id
			});
		  });
	  };
};
// Update a Vehicle by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vehicle was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Vehicle with id=${id}. Maybe Vehicle was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Vehicle with id=" + id
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};