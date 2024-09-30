const Listing = require("../models/listing.model");

exports.createListing = async (req, res) => {
  try {
    const listing = new Listing({
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      area: req.body.area,
      categoryId: req.body.categoryId,
    });
    await listing.save();
    res.status(201).send(listing);
  } catch (error) {
    res.status(400).send({ message: "Error creating listing", error });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("userId", "name")
      .populate("categoryId", "name");
    res.send(listings);
  } catch (error) {
    res.status(500).send({ message: "Error fetching listings", error });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("userId", "name")
      .populate("categoryId", "name");
    if (!listing) {
      return res.status(404).send({ message: "Listing not found" });
    }
    res.send(listing);
  } catch (error) {
    res.status(500).send({ message: "Error fetching listing by ID", error });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!listing) {
      return res.status(404).send({ message: "Listing not found" });
    }
    res.send(listing);
  } catch (error) {
    res.status(400).send({ message: "Error updating listing", error });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).send({ message: "Listing not found" });
    }
    res.send({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting listing", error });
  }
};
