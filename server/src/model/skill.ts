import * as mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
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

export const skillModel = mongoose.model("Skill", SkillSchema);
