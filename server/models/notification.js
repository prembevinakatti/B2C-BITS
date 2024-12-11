const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema(
  {
    to:{
        type: String,
        required: true,
    },
    type: {
      type: String,
      enum: ["view","delect","info"], 
      default: "info",
    },
    title: {
      type: String,
      required: true,
    },
    filedetails:{
        type:Object,
        required: true,
    },
    userdata:{
        type:Object,
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const NotificationModel= mongoose.model("Notification", NotificationSchema);
module.exports=NotificationModel
