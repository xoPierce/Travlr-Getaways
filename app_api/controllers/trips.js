const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

// GET: /trips lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while fetching trips" });
    }
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.find({ 'code': req.params.tripCode }).exec();
        if (!trip || trip.length === 0) {
            return res.status(404).json({ message: "Trip not found" });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while fetching the trip" });
    }
};

const tripsAddTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .create({
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                    (err, trip) => {
                        if (err) {
                            return res
                                .status(400) // bad request
                                .json(err);
                        } else {
                            return res
                                .status(201) // created
                                .json(trip);
                        }
                    });
        }
    );
}

const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .findOneAndUpdate({ 'code': req.params.tripCode }, {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, { new: true })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code" + req.params.tripCode
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code" + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // server error
                        .json(err);
                });
        }
    );
}

const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User.findOne({ email: req.payload.email }).exec((err, user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found in the database" });
            } else if (err) {
                console.log("Error finding user:", err);
                return res.status(500).json({ message: "Internal server error while finding the user" });
            }
            callback(req, res, user.name);
        });
    } else {
        return res.status(404).json({ message: "User email not found in the payload" });
    }
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};