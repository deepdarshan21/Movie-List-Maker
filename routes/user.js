const express = require("express");
const { getUserName } = require("../controllers/user");

const router = express.Router();

router.route("/userName").post(getUserName);

module.exports = router;
