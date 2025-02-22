const NotificationModel = require("../models/notification");
const Requestmodel = require("../models/requestmodle");
const userModel = require("../models/userModel");

module.exports.handleUpdateFcmToken = async (req, res) => {
  const { user } = req;
  const { token } = req.body;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ msg: "Valid FCM token is required." });
  }

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { fcmTokens: token } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found." });
    }

    res.status(200).json({
      msg: "FCM token updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating FCM token:", error);
    res.status(500).json({ msg: "Internal Server Error." });
  }
};
module.exports.handleGetRequestByStatus = async (req, res) => {
  const { status, id } = req.query;
  console.log(req.query);

  try {
    if (!status || !id) {
      return res
        .status(400)
        .json({ msg: "Missing required query parameters: 'status' and 'id'" });
    }
    const metamaskId = id.toLowerCase();
    const data = await Requestmodel.find({ to: metamaskId, status });
    if (data.length === 0) {
      return res
        .status(200)
        .json({ msg: "No data found for the given status and ID", data: [] });
    }
    res.status(200).json({ msg: "Fetched data successfully", data });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};


module.exports.handleGetNotifications = async (req, res) => {
  try {
    const { metamaskId } = req.query;
    if (!metamaskId) {
      return res.status(400).json({ msg: "Metamask ID is required." });
    }
    const toLowerCaseMetamask = metamaskId.toLowerCase();
    const response = await NotificationModel.find({ to: toLowerCaseMetamask });
    if (!response || response.length === 0) {
      return res.status(200).json({ msg: "No notifications found.", data: [] });
    }
    return res.status(200).json({ msg: "Notifications fetched successfully.", data: response });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};


// const FileUpload = require('../models/FileUpload');
// const User = require('../models/userModel');  // Assuming you have a User model
// const MAX_STORAGE = 50 * 1024 * 1024 * 1024;  // 50GB in bytes

// // Function to upload a file and update space usage
// module.exports.uploadFile = async (req, res) => {
//   try {
//     const { userId, file } = req.body;  // Assuming user ID and file are passed in the request body

//     // File size in bytes
//     const fileSize = file.size;

//     // Check current total storage used by the user
//     const totalUsedSpace = await FileUpload.aggregate([
//       { $match: { userId } },
//       { $group: { _id: '$userId', totalSpaceUsed: { $sum: '$fileSize' } } },
//     ]);

//     const currentUsedSpace = totalUsedSpace[0]?.totalSpaceUsed || 0;

//     // Check if user has exceeded the limit
//     if (currentUsedSpace + fileSize > MAX_STORAGE) {
//       return res.status(400).json({
//         message: 'Storage limit exceeded. You cannot upload this file.',
//       });
//     }

//     // Save file upload details to the database
//     const newFile = new FileUpload({
//       userId,
//       fileName: file.originalname,
//       fileSize,
//       fileUrl: file.url,  // Assuming the file URL is generated after upload
//     });

//     await newFile.save();

//     // Return response
//     return res.status(200).json({
//       message: 'File uploaded successfully.',
//       file: newFile,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error uploading file.' });
//   }
// };

// // Function to get total space used by a user
// const getUserSpaceUsage = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Get total space used by the user
//     const totalUsedSpace = await FileUpload.aggregate([
//       { $match: { userId } },
//       { $group: { _id: '$userId', totalSpaceUsed: { $sum: '$fileSize' } } },
//     ]);

//     const usedSpace = totalUsedSpace[0]?.totalSpaceUsed || 0;

//     // Return the total space used in MB and GB
//     return res.status(200).json({
//       usedSpaceMB: usedSpace / (1024 * 1024),
//       usedSpaceGB: usedSpace / (1024 * 1024 * 1024),
//       remainingSpaceGB: (MAX_STORAGE - usedSpace) / (1024 * 1024 * 1024),
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error fetching space usage.' });
//   }
// };


