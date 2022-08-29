const {toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insidePolygon } = require('geolocation-utils');
const { random } = require('lodash');
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
  var randomNumber1 = random(100, true);
  var randomNumber2 = random(100, true);
  var latlong = { lat: randomNumber1, lng: randomNumber2 };
  var tolatLong = toLatitudeLongitude(latlong);

  // calculate the distance between locations, move to a new location
  console.log(headingDistanceTo(tolatLong.latitude, tolatLong.longitude)); 
  
  // Save the vehicle in the database
  try {

    var created = await vehicles.create(vehicle);
    if ( created ) {
      
      var latestRecord = this.getLatestRecord();
      const {id, registration_number, vehicle_type} = latestRecord;
      var metadata = {
        "id": id, 
        "registration_number": registration_number, 
        "vehicle_type": vehicle_type,
        "current_longitude" : tolatLong.longitude,
        "current_latitude" : tolatLong.latitude,
        "previous_longitude": latlong.lng,
        "previous_latitude": latlong.lat
      }
      console.log(metadata);
      var vehicleInformation = vehicle_information.create(metadata);
      if ( vehicleInformation)
        res.status(200).send({
          message: 'Vehicle Registered Successfully!',
        })
      else {
        res.status(500).send({
          message: 'Vehicle could not be registered!'
        })
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while registering the vehicle.',
    })
  }
};

this.getLatestLocation = async () => {

}

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