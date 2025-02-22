const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the user
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },  // File size in bytes
    fileUrl: { type: String ,default:true },   // URL of the uploaded file
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);
module.exports = FileUpload;
