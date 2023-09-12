var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* GET travel view */
const travel = (req, res) => {
    const defaultTitle = 'Travel - Travlr Getaways';
    pageTitle = defaultTitle;
    res.render('travel', { title: pageTitle, trips});
};

module.exports = {
    travel
};
   