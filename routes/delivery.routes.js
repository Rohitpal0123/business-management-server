const express = require("express");
const router = express.Router();

router.post("/create", require("../controllers/delivery/create").process);
router.get("/", require("../controllers/delivery/get").process);
router.get("/:id", require("../controllers/delivery/getById").process);
router.put("/:id", require("../controllers/delivery/update").process);
module.exports = router;
