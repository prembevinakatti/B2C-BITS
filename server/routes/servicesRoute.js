const { Router } = require("express")
const { handleUpdateFcmToken } = require("../controllers/servicescontroler")
const isAuthenticated = require("../middleware/isAuthenticated")
const router=Router()
router.post("/updatefcmtoken",isAuthenticated,handleUpdateFcmToken)
module.exports=router