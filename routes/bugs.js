const router = require('express').Router();
let Bugs = require('../models/bugs.model');

router.route('/').get((req, res) => {
  Bugs.find()
    .then(bugs => res.json(bugs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const bugname = req.body.bugname;
    const reporter = req.body.reporter;
    const assignee = req.body.assignee;
    const status = req.body.status;
    const severity = req.body.severity;
    const date = Date.parse(req.body.date);

  const newBug = new Bugs({
    bugname,
    reporter,
    assignee,
    status,
    severity,
    date,
  });

  newBug.save()
  .then(() => res.json('New bug added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Bugs.findById(req.params.id)
    .then(bugs => res.json(bugs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Bugs.findByIdAndDelete(req.params.id)
    .then(() => res.json('Bug deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Bugs.findById(req.params.id)
    .then(bugs => {
        bugs.bugname = req.body.bugname;
        bugs.reporter = req.body.reporter;
        bugs.assignee = req.body.assignee;
        bugs.status = req.body.status;
        bugs.severity = req.body.severity;
        bugs.date = Date.parse(req.body.date);

        bugs.save()
            .then(() => res.json('Bug information updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;