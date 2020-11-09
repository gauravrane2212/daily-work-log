var router = require('express').Router();
let Log = require('../models/log.model');

/* GET all logs. */
router.route('/').get((req, res) => {
  Log.find()
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

module.exports = router;
