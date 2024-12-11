const NotificationModel = require("../models/notification");
const Requestmodel = require("../models/requestmodle");
const userModel = require("../models/userModel");
const { pushnotification } = require("../services/notificationservice");
const categoryModel = require("../models/category");
module.exports.handlenotify = async (req, res) => {
  console.log(req.body);
  const { to, type, userdata, filedetails } = req.body;
  console.log(to, type, userdata, filedetails);
  if (!to || !type || !userdata || !filedetails) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const lowermetamaskid = to.toLowerCase();

    const touser = await userModel.findOne({ metamaskId: lowermetamaskid });
    if (!touser) {
      return res.status(404).json({ message: "User not found." });
    }
    const fcmTokens = touser.fcmTokens || [];
    let notificationTitle, notificationBody;
    if (type === "Delect") {
      notificationTitle = `A file is deleted from your uploads by ${userdata.role}`;
      notificationBody = `File named "${filedetails.filename}" was deleted by a higher authority.`;
      await NotificationModel.create({
        filedetails,
        title: notificationTitle,
        to,
        type: "delect",
        userdata,
      });

      const notificationData = {
        title: notificationTitle,
        body: notificationBody,
        clickAction: "http://localhost:5173/notify",
      };
      if (fcmTokens.length > 0) {
        await pushnotification({ fcmTokens, notificationData });
      }
    } else if (type === "View") {
      notificationTitle = `A person viewed your uploaded file: ${userdata.name}, role: ${userdata.role}`;
      notificationBody = `File named "${filedetails.filename}" was viewed by ${userdata.name}.`;
      await NotificationModel.create({
        filedetails,
        title: notificationTitle,
        to,
        type: "view",
        userdata,
      });
      console.log("notification sent");
      const notificationData = {
        title: notificationTitle,
        body: notificationBody,
        clickAction: "http://localhost:5173/notify",
      };
      console.log();
      if (fcmTokens.length > 0) {
        await pushnotification({ fcmTokens, notificationData });
      }
    } else {
      return res.status(400).json({ message: "Invalid notification type." });
    }
    res.status(200).json({ message: "Notification handled successfully." });
  } catch (error) {
    console.error("Error handling notification:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while handling the notification.",
        error: error.message,
      });
  }
};
module.exports.handleGetFileAccessStatus = async (req, res) => {
  const { fileId, userId } = req.body;
  console.log(fileId, userId, "file acees stutaus");

  try {
    const data = await Requestmodel.findOne({ fileId, userId });
    if (!data || data.status === "rejected") {
      return res.status(200).json({
        msg: "No request found",
        data: { type: false, data: [] },
      });
    }
    console.log(data);
    return res.status(200).json({
      msg: "Request exists",
      data: { type: true, data },
    });
  } catch (error) {
    console.error("Error fetching file access status:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
module.exports.handleCreateViewRequest = async (req, res) => {
  const { filedetails, description, userId } = req.body;

  // Validate required fields
  if (!filedetails || !description || !userId) {
    return res.status(400).json({ msg: "Missing required fields." });
  }

  try {
    const newRequest = await Requestmodel.create({
      description,
      fileId: filedetails.fileId,
      to: filedetails.to.toLowerCase(),
      userId,
    });
    console.log(newRequest, "new request");

    // Ensure `to` is a valid string before converting case
    if (typeof filedetails.to !== "string") {
      return res
        .status(400)
        .json({ msg: "Invalid `to` field in filedetails." });
    }

    const lowermetamaskid = filedetails.to.toLowerCase();

    // Find the recipient user
    const touser = await userModel.findOne({ metamaskId: lowermetamaskid });
    if (!touser) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Send push notification if FCM tokens exist
    const fcmTokens = Array.isArray(touser.fcmTokens)
      ? touser.fcmTokens.filter((token) => token)
      : [];
    const notificationData = {
      title: "A new view request for you",
      body: description,
      clickAction: "http://localhost:5173/notify",
    };
    console.log(touser);
    if (fcmTokens.length > 0) {
      await pushnotification({ fcmTokens, notificationData });
    }

    res
      .status(201)
      .json({ msg: "Request created and notification sent successfully." });
  } catch (error) {
    console.error("Error creating view request:", error, {
      filedetails,
      description,
      userId,
    });
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports.handleConfirmView = async (req, res) => {
  const { requestId } = req.body;
  try {
    const response = await Requestmodel.findByIdAndUpdate(
      requestId,
      { status: "approved" },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({ msg: "Request not found." });
    }
    const touser = await userModel.findOne({ metamaskId: response.userId });
    if (!touser) {
      return res.status(404).json({ msg: "User not found." });
    }
    const fcmTokens = touser.fcmTokens || [];
    const notificationData = {
      title: "Your file request has been accepted",
      body: "Your request was approved by the admin.",
      clickAction: "http://localhost:5173/accepted",
    };
    if (fcmTokens.length > 0) {
      await pushnotification({ fcmTokens, notificationData });
    }
    res.status(200).json({ msg: "Request approved and notification sent." });
  } catch (error) {
    console.error("Error confirming view request:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
module.exports.handleReject = async (req, res) => {
  const { requestId } = req.body;

  try {
    const response = await Requestmodel.findByIdAndUpdate(
      requestId,
      { status: "rejected" },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ msg: "Request not found." });
    }

    const touser = await userModel.findOne({ metamaskId: response.userId });
    if (!touser) {
      return res.status(404).json({ msg: "User not found." });
    }

    const fcmTokens = touser.fcmTokens || [];
    const notificationData = {
      title: "Your file request has been rejected",
      body: "Your request was denied by the admin.",
      clickAction: "http://localhost:5173/rejected",
    };

    if (fcmTokens.length > 0) {
      await pushnotification({ fcmTokens, notificationData });
    }

    res.status(200).json({ msg: "Request rejected and notification sent." });
  } catch (error) {
    console.error("Error rejecting view request:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
module.exports.updateCategory = async (req, res) => {
  try {
    const { toUpdate, data } = req.body;
    if (!data || !data._id || !data.Subcategories) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    if (toUpdate === "maincategory") {
      await categoryModel.create({
        _id: data._id,
        subcategories: data.Subcategories,
      });
      return res
        .status(201)
        .json({ message: "Main category created successfully" });
    } else {
      const categoryData = await categoryModel.findOne({ _id: data._id });
      if (!categoryData) {
        return res.status(404).json({ message: "Category not found" });
      }
      data.Subcategories.forEach((subcat) => {
        if (!categoryData.subcategories.includes(subcat)) {
          categoryData.subcategories.push(subcat);
        }
      });
      await categoryData.save();
      return res.status(200).json({ message: "Category updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports.getCategoryDataByRole = async (req, res) => {
  try {
    const { user } = req;
    let data;

    if (user.role === "head") {
      const categories = await categoryModel.find({});
      if (!categories || categories.length === 0) {
        return res.status(404).json({ message: "No categories found" });
      }
      data = categories;
    } else {
      const { maincategory } = req.body;
      if (!maincategory) {
        return res.status(400).json({ message: "maincategory is required" });
      }
      const category = await categoryModel.findOne({ _id: maincategory });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      data = category;
    }
    return res
      .status(200)
      .json({ message: "Fetched category successfully", data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
