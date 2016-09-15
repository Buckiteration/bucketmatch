'use strict';

const express = require('express');
const userCtrl = require('./server-sql/controllers/user-controller');
const actCtrl = require('./server-sql/controllers/act-controller');
const uaCtrl = require('./server-sql/controllers/ua-controller');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser({limit: '50mb'}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

// to log in and get current user info
app.get('/user/:username/:password',
  // Get the current user's info and attach to req.user
  userCtrl.show,

  // Get all activities associated to the current user, then
  // send a JSON response of the form {activities, user}
  userCtrl.conn
);


// to get a single user's profile with limited info'
app.get('/userinfo/:username/',
  // Get the current user's info, then send a JSON response
  // of the form {username, profilepic, bio}
  userCtrl.profile,

  // End the response
  (req, res) => { res.end(); }
);


// full list of users, not needed for front-end
app.get('/test', userCtrl.index);


// to add a single user
app.post('/user/add', userCtrl.add, (req, res) => { res.sendStatus(200); });


// full list of activities, for user to choose from
app.get('/activities', actCtrl.index);


// to add a new activity
app.post('/activity/add',
  actCtrl.add,
  uaCtrl.add,
  (req, res) => { res.end(); }
);


// to view all joins between users & activities
app.get('/useractivities',
  uaCtrl.index,
  (req, res) => { res.end(); }
);


// to add an existing activity TO a User
app.post('/useractivity/add',
  uaCtrl.add,
  (req, res) => { res.end(); }
);


app.get('/activities', actCtrl.index); // full list of activities, for user to choose from
app.post('/activity/add', actCtrl.add, uaCtrl.add, (req, res) => { res.sendStatus(200); });// to add a new activity

// users by activity
app.get('/useractivity/userbyact/:activity', uaCtrl.userByAct); 

// app.put('/useractivity/close', uaCtrl.close, (req, res) => {res.end() }); // to mark activity as done

//stores new bio image to database
app.put('/useractivity/addbioimage', userCtrl.addBioImage, (req, res) => { res.end(); });


app.put('/useractivity/addbio',
  userCtrl.addBio,
  (req, res) => { res.end(); }
);

// to find all users that have activity matches with the current user
app.get('/mymatches/:userid',
  uaCtrl.findByAct);

app.use(express.static(path.join(__dirname, '/client/')));

app.listen(3000, () => {
  console.log('listening on port 3000');
});
