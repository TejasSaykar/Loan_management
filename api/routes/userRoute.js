const express = require("express");
const { userRegistration, getUsers, getSingleUser, getDayUser, getWeekUser } = require("../controllers/userController");

const router = express.Router();

router.post("/user-registration", userRegistration);

router.get("/all-users", getUsers);

router.get("/single-user/:id", getSingleUser);

// Get day wise user
router.get("/day-user/:day", getDayUser);

// Get week wise users
router.get("/week-user/:week", getWeekUser);


module.exports = router;