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
        )

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found." });
        }

        res.status(200).json({ 
            msg: "FCM token updated successfully.", 
            data: updatedUser 
        });
    } catch (error) {
        console.error("Error updating FCM token:", error);
        res.status(500).json({ msg: "Internal Server Error." });
    }
};
module.exports.handleGetRequestByStatus = async (req, res) => {
  const { status, id } = req.query;
  try {
    if (!status || !id) {
      return res.status(400).json({ msg: "Missing required query parameters: 'status' and 'id'" });
    }
    const metamaskId = id.toLowerCase();
    const data = await Requestmodel.find({ to: metamaskId, status });
    if (data.length === 0) {
      return res.status(404).json({ msg: "No data found for the given status and ID", data: [] });
    }
    res.status(200).json({ msg: "Fetched data successfully", data });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};
