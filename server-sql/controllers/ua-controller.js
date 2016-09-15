"use strict";
const database = require('../models/database');

const sequelize = database.sequelize;
const UserActivity = database.UserActivity;
const Activity = database.Activity;

function index(req, res) { // displays all activities associated with users? for devs not production
  UserActivity.findAll({}).then((uas) => {
    return res.json(uas);
  });
}

function add(req, res, next) { // associates a user and a activity
  const {activityId, userId} = req.body;
  UserActivity.create({activityId, userId})
    .then(useractivity => {
      next();
    })
    .catch(err => {
      console.error(err);
      return res.status(200).json({
        error: 'You already have that activity on your bucketlist'
      });
    });
}


// myMatch query nightmare
function findByAct(req, res, next) { // finds all users by activity
  Activity.sequelize.query('SELECT "activityId" FROM "useractivities" WHERE "userId" =' + req.params.userid)
  .then((queryData) => {
    return UserActivity.sequelize.query('SELECT DISTINCT useractivities."userId" FROM useractivities WHERE useractivities."activityId" IN (' + queryDataParser(queryData, "activityId") + ')')
  })
  .then((queryData) => {
    return UserActivity.sequelize.query('SELECT DISTINCT username,profilepic FROM users WHERE _ID IN (' + queryDataParser(queryData, "userId") + ')')
  })
  .then((queryData) => {
    let myMatches = [];
    for (let i = 0; i < queryData[0].length; i++ ) {
      myMatches.push({username:queryData[0][i]});
    }
    return res.send(JSON.stringify(myMatches));
  }).catch((err) => {
    res.sendStatus(500);
  });
}

// helper function to parse the sequilize obj return
function queryDataParser(queryData, querySelector) {
  let queryString = []
  for (let i = 0; i < queryData[0].length; i++) {
    queryString.push(queryData[0][i][querySelector])
  }
  return queryString.join(",");
}


function userByAct(req, res, next) { // finds all users by activity
  Activity.sequelize.query('SELECT "username" from "users" join "useractivities" on ' +
  '("useractivities"."userId" = "users"."_id") join "activities" on ("activities"."_id" = ' +
  '"useractivities"."activityId") where "actname" =\'' + req.params.activity + '\'')
  .then((data) => {
    const output = { users: data[0] };
    res.json(output);
    next();
  });
}

module.exports = { index, add, findByAct, userByAct };
