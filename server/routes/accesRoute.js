const express=require("express")
const Router=express.Router()
const {getCategoryDataByRole,handlenotify,handleReject,handleConfirmView,updateCategory,handleGetFileAccessStatus,handleCreateViewRequest}=require("../controllers/accsesControl")
Router.route("/notify").post(handlenotify)
Router.route("/viewreject").post(handleReject)
Router.route("/viewconform").post(handleConfirmView)
Router.route("/updatecatogory").post(updateCategory)
Router.route("/createviewrequest").post(handleCreateViewRequest)
Router.route("/getfileaccessstatus").post(handleGetFileAccessStatus)
Router.route("/getcategorydata").get(getCategoryDataByRole)
module.exports=Router