const express = require("express");
const router = express.Router();
const { searchFood, getFood } = require("../controllers/foodController.js");
const asyncHandler = require("../utils/asyncHandler");



router.get("/search", asyncHandler(searchFood));
router.get("/:id", asyncHandler(getFood));

module.exports = router;
