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
