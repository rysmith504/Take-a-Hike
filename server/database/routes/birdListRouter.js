// Import Dependencies
const birdListRouter = require('express').Router();
const Query = require('../models/query.model');

// Read all queries from the DB
birdListRouter.route('/').get((req, res) => {
  Query.find()
    .then(queries => res.json(queries))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Create a new query in the DB
birdListRouter.route('/add').post((req, res) => {
  console.log(req);
  const query = req.body.query;
  const count = 1;
  const newQuery = new Query({query, count});
  newQuery.save()
    .then(() => res.json('Query Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Read an existing query in the DB (Is this necessary ???)
birdListRouter.route('/:id').get((req, res) => {
  Query.findById(req.params.id)
    .then(query => res.json(query))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Route with 
birdListRouter.route('/search/:search').get((req, res) => {
  Query.find({query: req.params.search})
    .then(query => res.json(query))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Delete a query in the DB by search term
birdListRouter.route('/search/:search').delete((req, res) => {
  Query.findByIdAndDelete({query: req.params.search})
    .then(query => res.json('Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a query in the DB by id
birdListRouter.route('/:id').delete((req, res) => {
  Query.findByIdAndDelete(req.params.id)
    .then(query => res.json(query))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update an existing query in the DB
birdListRouter.route('/update/:id').put((req, res) => {
  Query.findById(req.params.id)
    .then(query => {
      query.count += 1;
      query.save()
        .then(() => res.json('Query Added'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ', err));
});

// Export Router
module.exports ={
  birdListRouter,
};