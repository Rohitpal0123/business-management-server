const express = require("express");
const router = express.Router();

router.post("/create", require("../controllers/order/create").process);
router.get("/", require("../controllers/order/get").process);
router.get("/:id", require("../controllers/order/getById").process);
router.put("/:id", require("../controllers/order/update").process);

module.exports = router;