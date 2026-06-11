import Inquiry from "../models/Inquiry.js";

export const getInquiries = async (req, res) => {
  try {
    const filter = {};

    // If owner, get inquiries for their PGs
    if (req.user.role === "owner") {
      filter["pg.owner"] = req.user.id;
    } else {
      // If tenant, get their own inquiries
      filter.tenant = req.user.id;
    }

    const inquiries = await Inquiry.find(filter)
      .populate("tenant", "name email phone")
      .populate({
        path: "pg",
        populate: { path: "owner", select: "name email" },
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
    const { pgId, message, moveInDate } = req.body;

    const inquiry = await Inquiry.create({
      tenant: req.user.id,
      pg: pgId,
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
