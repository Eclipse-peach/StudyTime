//const express = require("express");
//const router = express.Router();
const{ Router } = require("express");
const router = Router();

router.use("/ranking", require("./ranking"));
router.use("/timer", require("./timer"));
router.use("/user", require("./user"));
//router.use("/movie", require("./movie/movie"));

module.exports = router;

