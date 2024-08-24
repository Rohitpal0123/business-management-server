const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/billing/create").process);

module.exports = router;    