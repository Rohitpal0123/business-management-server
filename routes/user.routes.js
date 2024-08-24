const express = require("express");
const router = express.Router();

router.post("/signup", require("../controllers/user/signup").process);
router.get("/", require("../controllers/user/get").process);
router.get("/:id", require("../controllers/user/getById").process);
router.post("/login", require("../controllers/user/login").process);

module.exports = router;
