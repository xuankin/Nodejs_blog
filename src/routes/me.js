const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

// newsController.index
router.get("/stored/courses", meController.show);
router.get("/trash/courses", meController.trashCourse);
module.exports = router;
