import Wishlist from "../models/Wishlist.js";
import PG from "../models/PG.js";

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id })
      .populate({
        path: "pg",
        populate: { path: "owner", select: "name email phone" },
      });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { pgId } = req.body;

    // Check if PG exists
    const pg = await PG.findById(pgId);
    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    // Check if already in wishlist
    const existing = await Wishlist.findOne({ user: req.user.id, pg: pgId });
    if (existing) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      pg: pgId,
    });

    res.status(201).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { pgId } = req.params;

    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user.id,
      pg: pgId,
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Item not in wishlist" });
    }

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
