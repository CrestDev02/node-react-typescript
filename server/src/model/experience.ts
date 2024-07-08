import * as mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
  },
  { timestamps: true }
);

export const experienceModel = mongoose.model("Experience", ExperienceSchema);
