const mongoose = require('mongoose');
const model = mongoose.model('trips');

// GET: /trips lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await model.find({}).exec();
        if (!trips) {
            return res.status(404).json({ "message": "Trips not found" });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(500).json(err); // Handle the error appropriately
    }
};
  
// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await model.findOne({ 'code': req.params.tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ "message": "Trip not found" });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        return res.status(500).json(err); // Handle the error appropriately
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};