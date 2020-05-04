const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Prob = require('./models/prob');

// api imports
const problist = require('./api/problist');
const probadd = require('./api/probadd');
const probsolve = require('./api/probsolve');

const app = express();

// use mongoose to connect to mongoDB cloud cluster database with provided credentials
mongoose.connect(
  'mongodb+srv://lei:VROWfivJL07HopT7@cluster0-skeng.mongodb.net/yuncode?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Database connection failed!');
});

// set data parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// use cors middleware to allow CORS
app.use(cors());

// use apis
app.use('/api/problist', problist);
app.use('/api/probadd', probadd);
app.use('/api/probsolve', probsolve);

// routine clean
setInterval(() => {
  const clearAll = false;
  console.log('express:app:routine clean:start');
  Prob.find()
    .then(probList => {
      for (const prob of probList) {
        console.log('express:app:routine clean:check prob ID:', prob._id);
        console.log('      likes: ', prob.likes, '   hates: ', prob.hates);
        if (prob.hates > 10 && prob.hates / prob.likes > 3 || clearAll) {
          console.log('      --->delete prob by ID:[' + prob._id + ']');
          Prob.findByIdAndDelete(prob._id)
            .then(console.log('     ===>delete succesful'));
        }
      }
    });
}, 3600000);

module.exports = app;
