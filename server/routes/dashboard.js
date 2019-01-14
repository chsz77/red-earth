const express = require("express");
const router = express.Router({ mergeParams: true});
const { loginRequired } = require("../middleware/auth")
const { getDashboard } = require("../handlers/dashboard")


router.route("/:user_id")
  .get(loginRequired, getDashboard)

module.exports = router;