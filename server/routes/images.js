const express = require("express");
const router = express.Router({ mergeParams: true});
const { loginRequired, ensureCorrectUser } = require("../middleware/auth")

const { getImages, newImage, getImage, deleteImage, editImage, votes } = require("../handlers/images");

router.route("/:limit/:skip")
  .get(getImages)

router.route("/:user_id")
  .post(loginRequired, newImage);

router.route("/:image_id")
  .get(getImage)

router.route("/:image_id/:user_id")
  .post(loginRequired, votes)
  .delete(loginRequired, ensureCorrectUser, deleteImage);

router.route("/:image_id/edit/:user_id")
  .put(loginRequired, ensureCorrectUser, editImage)

module.exports = router;