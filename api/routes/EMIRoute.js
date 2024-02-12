const express = require("express");
const { EMI } = require("../controllers/EMIController");

const router = express.Router();

router.put("/calculate-emi", EMI);


module.exports = router;