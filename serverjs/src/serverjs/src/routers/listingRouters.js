const express = require("express");
const listingController = require("../controllers/listing.controller");
const router = express.Router();

router.post("/", listingController.createListing);
router.get("/", listingController.getAllListings);
router.get("/:id", listingController.getListingById);
router.put("/:id", listingController.updateListing);
router.delete("/:id", listingController.deleteListing);

module.exports = router;
