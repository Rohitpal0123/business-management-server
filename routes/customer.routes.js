const express = require("express");
const router = express.Router();

router.get("/", require("../controllers/customer/get").process);
router.put("/:id", require("../controllers/customer/update").process);
router.post("/create", require("../controllers/customer/create").process);
router.get("/:id", require("../controllers/customer/getById").process);
module.exports = router;