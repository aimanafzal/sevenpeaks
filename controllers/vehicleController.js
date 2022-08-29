const {toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insidePolygon } = require('geolocation-utils');
const { vehicle } = require('../models');
const db = require("../models");

const vehicles = db.vehicle;
const vehicle_information = db.vehicle_Information;
// const Op = db.Sequelize.Op;


// Register a vehicle
exports.create = async(req, res) => {
  // Validate request
  if (!req.body.registration_number) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Registering the vehicle 
  const vehicle = {
    registration_number: req.body.registration_number,
    vehicle_type: req.body.vehicle_type,
  };

  console.log(toLatLon([4, 51]))                        
  // { lat: 51, lon: 4 }
  console.log(toLatitudeLongitude({ lat: 51, lng: 4 })) 
  // { latitude: 51, longitude: 4 }

  // calculate the distance between locations, move to a new location
  const location1 = {lat: 51, lon: 4}
  const location2 = {lat: 51.001, lon: 4.001 }
  console.log(headingDistanceTo(location1, location2)) 
  // { 
  //   heading: 32.182377166258156,  // degrees
  //   distance: 131.52837683622332  // meters
  // }
  console.log(moveTo(location1, {heading: 32.1, distance: 131.5}))

  
  // Save the vehicle in the database
  try {
    var created = await vehicles.create(vehicle);

    var vehicleInformation = vehicle_information.create();

    if ( created ) {
      
      var latestRecord = this.getLatestRecord();
      const {id, registration_number, vehicle_type} = latestRecord;
      console.log(id, registration_number, vehicle_type);
      res.status(200).send({
        message: 'Vehicle Registered Successfully!',
      })

    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while registering the vehicle.',
    })
  }
};

this.getLatestRecord = async () => {
  const latest = await vehicle.find().sort({ $natural: -1 }).limit(1);
  return latest;
}

// Find a single record with an id
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