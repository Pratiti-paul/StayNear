import PG from "../models/PG.js";

export const getAllPGs = async (req, res) => {
  try {
    const { city, minRent, maxRent, amenities, roomType } = req.query;
    const filter = { isActive: true };

    if (city) filter["address.city"] = { $regex: city, $options: "i" };
    if (minRent || maxRent) {
      filter.rent = {};
      if (minRent) filter.rent.$gte = parseInt(minRent);
      if (maxRent) filter.rent.$lte = parseInt(maxRent);
    }
    if (amenities) {
      filter.amenities = { $in: Array.isArray(amenities) ? amenities : [amenities] };
    }
    if (roomType) filter.roomType = roomType;

    const pgs = await PG.find(filter)
      .populate("owner", "name email phone")
      .limit(20);

    res.status(200).json({
      success: true,
      count: pgs.length,
      data: pgs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPGById = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id)
      .populate("owner", "name email phone profileImage bio")
      .populate("reviews.user", "name profileImage");

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.status(200).json({
      success: true,
      data: pg,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPG = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      amenities,
      roomType,
      rent,
      deposit,
      totalRooms,
      images,
      coordinates,
    } = req.body;

    const pg = await PG.create({
      name,
      description,
      address,
      amenities,
      roomType,
      rent,
      deposit,
      totalRooms,
      availableRooms: totalRooms,
      images,
      coordinates,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: pg,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePG = async (req, res) => {
  try {
    let pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    if (pg.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this PG" });
    }

    pg = await PG.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: pg,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePG = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    if (pg.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this PG" });
    }

    await PG.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "PG deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchPGs = async (req, res) => {
  try {
    const { query, city, roomType } = req.query;
    const searchFilter = { isActive: true };

    if (query) {
      searchFilter.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    if (city) {
      searchFilter["address.city"] = { $regex: city, $options: "i" };
    }

    if (roomType) {
      searchFilter.roomType = roomType;
    }

    const pgs = await PG.find(searchFilter)
      .populate("owner", "name email phone")
      .limit(30);

    res.status(200).json({
      success: true,
      count: pgs.length,
      data: pgs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
