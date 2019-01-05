const express = require("express");
const router = express.Router({ mergeParams: true});
const { loginRequired, ensureCorrectUser } = require("../middleware/auth")
const { getComments, newComment, deleteComment } = require("../handlers/comments");

router.route("/:user_id")
  .post(loginRequired, ensureCorrectUser, newComment);

router.route("/:image_id")
  .get(getComments)
  
router.route("/:comment_id/:user_id")
  .delete(loginRequired, ensureCorrectUser, deleteComment);

module.exports = router;