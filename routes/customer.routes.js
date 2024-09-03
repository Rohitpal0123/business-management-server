const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/" , require("../controllers/customer/get").process);
router.put("/:id", require("../controllers/customer/update").process);
router.post("/create", require("../controllers/customer/create").process);
router.get("/:id", require("../controllers/customer/getById").process);
router.delete("/:id", require("../controllers/customer/delete").process);
router.post("/bulk-upload", upload.single("customers"), require("../controllers/customer/bulkUpload").process);
module.exports = router;