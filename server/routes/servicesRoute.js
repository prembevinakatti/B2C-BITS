const { Router } = require("express")
const { handleUpdateFcmToken ,handleGetRequestByStatus} = require("../controllers/servicescontroler")
const isAuthenticated = require("../middleware/isAuthenticated")
const router=Router()
router.post("/updatefcmtoken",isAuthenticated,handleUpdateFcmToken)
router.post("/requets",isAuthenticated,handleGetRequestByStatus)
module.exports=router