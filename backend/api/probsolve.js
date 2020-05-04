const router = require('express').Router();
const Prob = require('../models/prob');
const { exec, spawn } = require('child_process');
const fs = require('fs');

// route that get a problem ID and find the problem entry in the database using mongoose
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

// route that receive submitted code and try to compile and test.
router.post('/', (req, res, next) => {
  console.log('express: probsolve: post:');
  // create test environment (create solution.h and test.cc)
  fs.writeFileSync('temp/src/solution.h', req.body.submit);
  fs.writeFileSync('temp/test/test.cc', req.body.tester);
  // evaluate test result
  let evaResult = '';
  // execute test command on the created files and get command output
  exec('cd temp && bazel test test:test --verbose_failures', {'shell': 'pwsh.exe'}, (err, stdout, stderr) => {
    console.log('express:probsolve:test done:');
    // if an error message is returned
    if (err) {
      console.log(err);
      // if the command output contains string "Build did NOT complete", there could be a syntax error and files could not build
      if (err.message.includes('Build did NOT complete')) {
        evaResult = 'Build Failed.';
      // if the command output contains stirng "Build completed", the files can build and run but returned value does not match what was expected by the tester.
      } else if (err.message.includes('Build completed')) {
        evaResult = 'Build Completed. Test Failed.'
      } else {
        evaResult = err.message;
      }
      // if no error message is returned, a standard stdout message is returned which means the submitted files passed test.
    } else {
      console.log(stdout);
      evaResult = 'Test Passed!';
    }
    res.status(201).json({message: evaResult});
  });
});

module.exports = router;
