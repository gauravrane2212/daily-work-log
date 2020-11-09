var router = require('express').Router();
let Log = require('../models/log.model');

/* GET all logs. */
router.route('/').get((req, res) => {
  Log.find()
    .then(logs => res.json(logs))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* GET logs filtered by sentiment */
router.route('/sentiment/:id').get((req, res) => {
  Log.find({'sentiment': req.params.id})
    .then(logs => res.json(logs))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* GET logs filtered by goal */
router.route('/goal/:id').get((req, res) => {
  Log.find({'goal': req.params.id})
    .then(logs => res.json(logs))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* POST add a new log entry */
router.route('/add').post((req, res) => {
  const date = Date.parse(req.body.date);
  const goal = req.body.goal;
  const description = req.body.description;
  const sentiment = req.body.sentiment;

  const newLogEntry = new Log({
    date,
    goal,
    description,
    sentiment,
  });

  newLogEntry.save()
  .then(() => res.json('New log added successfully!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

/* DELETE a specific log entry */
router.route('/:id').delete((req, res) => {
  Log.findByIdAndDelete(req.params.id)
    .then(() => res.json('Log entry deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* UPDATE a specific log entry */
router.route('/update/:id').post((req, res) => {
  Log.findById(req.params.id)
    .then(log => {
      log.date = Date.parse(req.body.date);
      log.goal = req.body.goal;
      log.description = req.body.description;
      log.sentiment = req.body.sentiment;

      log.save()
        .then(() => res.json('Log entry updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
