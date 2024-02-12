const express = require("express");
const { EMI } = require("../controllers/EMIController");

const router = express.Router();

router.post("/calculate-emi", EMI);


module.exports = router;