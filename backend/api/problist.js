const router = require('express').Router();
const Prob = require('../models/prob');

// route that get all problems from database
router.get('/', (req, res, next) => {
  Prob.find()
    .then(docs => {
      console.log('express:problist:problem list fetched succesfully.');
      res.status(200).json({
        message: 'Problem list fetched successfully',
        problist: docs
      });
    });
});

// route that updates likes of a problem
router.patch('/like/:id', (req, res, next) => {
  console.log('express:patch like probID:[' + req.params.id + ']');
  Prob.findById(req.params.id)
    .then(docs => {
      console.log('current likes:', docs.likes);
      const newLikes = docs.likes + 1;
      Prob.findByIdAndUpdate({_id: docs._id}, {likes: newLikes}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('express:update successful');
        }
      });
    });
});

// route that updates hates of a problem
router.patch('/hate/:id', (req, res, next) => {
  console.log('express:patch hate (probId:[' + req.params.id + ']');
  Prob.findById(req.params.id)
    .then(docs => {
      console.log('current hates:', docs.hates);
      const newHates = docs.hates + 1;
      Prob.findByIdAndUpdate({_id: docs._id}, {hates: newHates}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('express:update successful');
        }
      });
    });
});

// router.patch('/like/:id', (req, res, next) => {
//   console.log('express:patch like probID:[' + req.params.id + ']');
// });

// router.patch('/hate/:id', (req, res, next) => {
//   console.log('express:patch hate (probId:[' + req.params.id + ']');
// });

module.exports = router;
