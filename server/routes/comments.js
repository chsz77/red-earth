const express = require("express");
const router = express.Router({ mergeParams: true});
const { loginRequired, ensureCorrectUser } = require("../middleware/auth")
const { getComments, newComment, deleteComment, getReplies, votes, hates } = require("../handlers/comments");

router.route("/:user_id")
  .post(newComment);

router.route("/:image_id")
  .get(getComments)

router.route("/replies/:parent_id")
  .get(getReplies)
  
router.route("/:comment_id/:user_id")
  .delete(loginRequired, ensureCorrectUser, deleteComment);

router.route("/:comment_id/:user_id/votes")
  .post(loginRequired, votes)

router.route("/:comment_id/:user_id/hates")
  .post(loginRequired, hates)  
  
module.exports = router;