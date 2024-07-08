import * as mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    certificate: {
      type: String,
      required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
  },
  { timestamps: true }
);

export const certificationModel = mongoose.model("Certification", CertificationSchema);
