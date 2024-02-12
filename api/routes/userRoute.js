const express = require("express");
const { userRegistration, getUsers, getSingleUser } = require("../controllers/userController");

const router = express.Router();

router.post("/user-registration", userRegistration);

router.get("/all-users", getUsers);

router.get("/single-user/:id", getSingleUser);


module.exports = router;