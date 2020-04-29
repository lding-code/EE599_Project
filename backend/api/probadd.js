const router = require('express').Router();
const Prob = require('../models/prob');

router.post('/', (req, res, next) => {
  const prob = new Prob({
    title: req.body.title,
    desc: req.body.desc,
    starter: req.body.starter,
    tester: req.body.tester,
    likes: 0,
    hates: 0,
    tags: []
  });
  console.log('New problem created')
  console.log(prob);
  prob.save();
  res.status(201).json({
    message: 'Problem added successfully'
  });
});

module.exports = router;
