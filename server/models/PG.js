import mongoose from "mongoose";

const pgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: {
        type: String,
        required: true,
      },
      state: String,
      pincode: String,
    },
    amenities: [
      {
        type: String,
        enum: [
          "WiFi",
          "AC",
          "Bed",
          "Wardrobe",
          "Study Table",
          "Attached Bathroom",
          "24/7 Water",
          "TV",
          "Parking",
          "Kitchen Access",
          "Laundry",
          "Gym",
          "Common Area",
          "Balcony",
        ],
      },
    ],
    roomType: {
      type: String,
      enum: ["single", "double", "triple", "dormitory"],
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    availableRooms: {
      type: Number,
      default: 1,
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for geospatial queries
pgSchema.index({ "coordinates.latitude": 1, "coordinates.longitude": 1 });
pgSchema.index({ city: 1, rent: 1 });

export default mongoose.model("PG", pgSchema);
