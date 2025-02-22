const { Router } = require("express");
const {
  handleUpdateFcmToken,
  handleGetRequestByStatus,
  handleGetNotifications,
  
} = require("../controllers/servicescontroler");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = Router();
router.post("/updatefcmtoken", isAuthenticated, handleUpdateFcmToken);
router.get("/requests", isAuthenticated, handleGetRequestByStatus);
router.get("/getallnotification",isAuthenticated,handleGetNotifications);
module.exports = router;
