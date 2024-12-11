import { useEffect, useState } from "react";
// import './App.css'
import { Outlet } from "react-router-dom";
import Navbar from "./components/Mycomponets/Navbar/Navbar";
import ShowFiles from "./components/Mycomponets/showFiles/ShowFiles";
import firebaseService from "../firebase";
import { useSelector } from "react-redux";
import axiosInstance from "./utils/Axiosinstance";

function App() {
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.auth.authUser);
  useEffect(()=>{
      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          const token = await firebaseService.requestToken();
          const fcmtoken=user?.fcmTokens;
          console.log(user)
          if (!fcmtoken.includes(token)) {
            try {
              await axiosInstance.post("/services/updatefcmtoken", { token });
              console.log("FCM token updated.");
            } catch (error) {
              console.error("Failed to update FCM token:", error);
            }
          } else {
            console.log("FCM token already exists.");
          }
        } else {
          console.log("Notification permission denied.");
        }
      });
  })
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <ShowFiles /> */}
    </>
  );
}

export default App;
