import Property from "../models/Property.js";
import jwt from "jsonwebtoken";

export const getAllProperties = async (req, res) => {
  try {
    const queryObj = {};

    // Parse token optionally to identify roles (Owner/Admin vs Seeker/Visitor)
    let userId = null;
    let userRole = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
        userRole = decoded.role;
      } catch (err) {
        // Ignore invalid token for public listing
      }
    }

    // Filter by Owner's listings if owner=true is passed
    if (req.query.owner === "true" && userId && userRole === "owner") {
      queryObj.owner = userId;
    } else if (userRole === "admin") {
      // Admin sees everything by default, but can filter by verified/featured
      if (req.query.verified) {
        queryObj.verified = req.query.verified === "true";
      }
      if (req.query.featured) {
        queryObj.featured = req.query.featured === "true";
      }
    } else {
      // Public visitors or standard seekers only see verified properties
      queryObj.verified = true;

      if (req.query.featured) {
        queryObj.featured = req.query.featured === "true";
      }
    }

    // Text search filter
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      queryObj.$or = [
        { title: searchRegex },
        { location: searchRegex },
        { propertyType: searchRegex },
        { nearbyCollege: searchRegex },
        { city: searchRegex },
      ];
    }

    // Filters for propertyType, gender, city
    if (req.query.propertyType) {
      queryObj.propertyType = req.query.propertyType;
    }
    if (req.query.gender) {
      queryObj.gender = req.query.gender;
    }
    if (req.query.city) {
      queryObj.city = new RegExp(req.query.city, "i");
    }

    let query = Property.find(queryObj).populate("owner", "name email phone");

    // Sorting options
    if (req.query.sort) {
      const sortBy = req.query.sort;
      if (sortBy === "price_asc") query = query.sort("price");
      else if (sortBy === "price_desc") query = query.sort("-price");
      else if (sortBy === "rating") query = query.sort("-rating");
      else if (sortBy === "newest") query = query.sort("-createdAt");
    } else {
      query = query.sort("-createdAt");
    }

    const properties = await query;
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email phone"
    );

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      gender,
      price,
      securityDeposit,
      location,
      city,
      state,
      pincode,
      nearbyCollege,
      distanceFromCollege,
      roomType,
      availableBeds,
      amenities,
    } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    let parsedAmenities = [];
    if (amenities) {
      parsedAmenities = Array.isArray(amenities)
        ? amenities
        : typeof amenities === "string"
        ? amenities.split(",").map((a) => a.trim())
        : [];
    }

    const property = await Property.create({
      owner: req.user.id,
      title,
      description,
      propertyType,
      gender,
      price: Number(price),
      securityDeposit: Number(securityDeposit),
      location,
      city,
      state,
      pincode,
      nearbyCollege,
      distanceFromCollege,
      roomType,
      availableBeds: Number(availableBeds),
      amenities: parsedAmenities,
      images,
      verified: false,
      featured: false,
    });

    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    if (property.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to update this property" });
    }

    const {
      title,
      description,
      propertyType,
      gender,
      price,
      securityDeposit,
      location,
      city,
      state,
      pincode,
      nearbyCollege,
      distanceFromCollege,
      roomType,
      availableBeds,
      amenities,
    } = req.body;

    let images = property.images;
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    let parsedAmenities = property.amenities;
    if (amenities) {
      parsedAmenities = Array.isArray(amenities)
        ? amenities
        : typeof amenities === "string"
        ? amenities.split(",").map((a) => a.trim())
        : [];
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        title: title || property.title,
        description: description || property.description,
        propertyType: propertyType || property.propertyType,
        gender: gender || property.gender,
        price: price ? Number(price) : property.price,
        securityDeposit: securityDeposit ? Number(securityDeposit) : property.securityDeposit,
        location: location || property.location,
        city: city || property.city,
        state: state || property.state,
        pincode: pincode || property.pincode,
        nearbyCollege: nearbyCollege || property.nearbyCollege,
        distanceFromCollege: distanceFromCollege || property.distanceFromCollege,
        roomType: roomType || property.roomType,
        availableBeds: availableBeds ? Number(availableBeds) : property.availableBeds,
        amenities: parsedAmenities,
        images,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    if (property.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to delete this property" });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyProperty = async (req, res) => {
  try {
    const { verified } = req.body;
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { verified: !!verified },
      { new: true }
    );

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markFeatured = async (req, res) => {
  try {
    const { featured } = req.body;
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { featured: !!featured },
      { new: true }
    );

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
