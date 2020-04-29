const router = require('express').Router();
const Prob = require('../models/prob');
const { exec, spawn } = require('child_process');
const fs = require('fs');


router.get('/:id', (req, res, next) => {
  Prob.findById(req.params.id)
    .then(docs => {
      console.log('express:probsolve:retreive problem by ID:[' + docs._id + ']');
      res.status(200).json({
        message: 'Problem fetched by ID successfully',
        prob: docs
      });
    });
});

router.post('/', (req, res, next) => {
  console.log('express: probsolve: post:');
  // create test environment (create solution.h and test.cc)
  fs.writeFileSync('backend/temp/src/solution.h', req.body.submit);
  fs.writeFileSync('backend/temp/test/test.cc', req.body.tester);
  // evaluate test result
  let evaResult = '';
  exec('cd backend/temp && bazel test test:test --verbose_failures', {'shell': 'pwsh.exe'}, (err, stdout, stderr) => {
    console.log('express:probsolve:test done:');
    if (err) {
      console.log(err);
      if (err.message.includes('Build did NOT complete')) {
        evaResult = 'Build Failed.';
      } else if (err.message.includes('Build completed')) {
        evaResult = 'Build Completed. Test Failed.'
      } else {
        evaResult = err.message;
      }
    } else {
      console.log(stdout);
      evaResult = 'Test Passed!';
    }
    res.status(201).json({message: evaResult});
  });
});

module.exports = router;
