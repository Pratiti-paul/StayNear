import Inquiry from "../models/Inquiry.js";
import Property from "../models/Property.js";

export const getInquiries = async (req, res) => {
  try {
    const filter = {};

    // If owner, get inquiries for their properties
    if (req.user.role === "owner") {
      const properties = await Property.find({ owner: req.user.id });
      const propertyIds = properties.map((p) => p._id);
      filter.property = { $in: propertyIds };
    } else {
      // If tenant, get their own inquiries
      filter.tenant = req.user.id;
    }

    const inquiries = await Inquiry.find(filter)
      .populate("tenant", "name email phone")
      .populate({
        path: "property",
        populate: { path: "owner", select: "name email phone" },
      });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInquiry = async (req, res) => {
  try {
    const { propertyId, message, moveInDate } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const inquiry = await Inquiry.create({
      tenant: req.user.id,
      property: propertyId,
      message,
      moveInDate,
    });

    res.status(201).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    inquiry.status = status;
    await inquiry.save();

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
