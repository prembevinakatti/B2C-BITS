import React, { useState } from "react";
import { Button } from "../../ui/button";
import ModeTogle from "./ModeTogle";
import { useDispatch, useSelector } from "react-redux";
import { IoMenu } from "react-icons/io5";
import {
  FaUserCheck,
  FaHome,
  FaFileUpload,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

import { RiAdminLine } from "react-icons/ri";
import { MdDashboard, MdNotifications } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { SiBlockchaindotcom } from "react-icons/si";
import { PiTreeViewDuotone } from "react-icons/pi";
import { IoIosPricetags } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { setAuthUser } from "@/redux/authslice";
import axiosInstance from "@/utils/Axiosinstance";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const dispatch = useDispatch();
  const isLogined = useSelector((state) => state.auth.authUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setAuthUser(null));
    navigate("/home");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSheetOpen = () => {
    if (!isLogined) {
      setShowPopover(true);
      return;
    }
    setIsOpen(true);
  };

  return (
    <nav className="w-screen shadow-md ">
      <div className=" mx-auto flex items-center px-4 py-3 justify-between">
        {/* Menu Trigger */}
        <Popover open={showPopover} onOpenChange={setShowPopover}>
          <PopoverTrigger asChild>
            <div onClick={handleSheetOpen}>
              <IoMenu
                size={30}
                className="text-black dark:text-white cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Please log in to access the menu.
            </p>
          </PopoverContent>
        </Popover>

        {/* Sidebar Sheet */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                <div>
                  <Separator className="my-3" />
                  <div
                    className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white"
                    onClick={() => handleNavigation("/home")}
                  >
                    <FaHome /> Home
                  </div>
                  <Separator className="my-3" />
                  <div
                    className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white"
                    onClick={() => handleNavigation("/view")}
                  >
                    <PiTreeViewDuotone /> View Files
                  </div>
                  <Separator className="my-3" />
                  <div
                    className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white"
                    onClick={() => handleNavigation("/uploadfiles")}
                  >
                    <FaFileUpload /> Upload Files
                  </div>
                  <Separator className="my-3" />
                  {isLogined?.role !== "Staff" && (
                    <div
                      className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white"
                      onClick={() => handleNavigation("/createuser")}
                    >
                      <FaUserAlt />
                      Create Admin Or Staff
                    </div>
                  )}
                  <Separator className="my-3" />
                  <div
                    className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white"
                    onClick={() => handleNavigation("/requests")}
                  >
                    <FaCodePullRequest /> Requests
                  </div>
                  <Separator className="my-3" />
                
                  <div
                    className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white"
                    onClick={() => handleNavigation("/notications")}
                  >
                    <MdNotifications /> Noification
                  </div>
                  <Separator className="my-3" />
                  {isLogined?.role === "Head" && (
                    <div
                      className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white"
                      onClick={() => handleNavigation("/assignpanel")}
                    >
                      <MdDashboard /> Assign Panel
                    </div>
                  )}
                  <Separator className="my-3" />
                  <div
                    className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white"
                    onClick={() => handleNavigation("/connectmetamask")}
                  >
                    <SiBlockchaindotcom />
                    Connect to Metamask
                  </div>
                  <Separator className="my-3" />
                  <div
                    className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white"
                    onClick={() => handleNavigation("/pricing")}
                  >
                    <IoIosPricetags />
                      Pricing
                  </div>
                  <Separator className="my-3" />
                  {isLogined && (
                    <div
                      className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-red-800 dark:hover:text-red-500 dark:text-red-200"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt /> Logout
                    </div>
                  )}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="text-2xl font-bold text-black dark:text-white">
          <a href="/">BlockDocs</a>
        </div>

        {/* Auth and Theme Toggle */}
        <div className="flex items-center space-x-4">
          <ModeTogle />
          {isLogined ? (
            <div className="flex items-center gap-2 border px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700">
              {isLogined.role}
              {isLogined.role === "Head" ? (
                <RiAdminLine size={20} />
              ) : (
                <FaUserCheck size={20} />
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
