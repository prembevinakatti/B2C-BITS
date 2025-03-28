import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card } from "../../ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox"; // assuming Checkbox component exists
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import axiosInstance from "@/utils/Axiosinstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const authUser = useSelector((state) => state.auth.authUser);
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setcategories] = useState([]);
  const [subcatogary, setsubcatogary] = useState([]);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      data.branch = branch;
      const response = await axios.post(
        `https://b2c-bits-server.onrender.com/api/user/createAdminOrStaff`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      navigate("/uploadfiles");
      toast.success("User account created successfully");
    } catch (error) {
      console.log("Error creating admin or staff account in client", error);
    }
    setLoading(false);
    setError(null);
  };

  const password = watch("password");
  function updatesubcatogary(selectedBranch) {
    const selectedCat = categories.find((cat) => cat._id === selectedBranch);
    console.log(selectedCat.subcategories);
    return selectedCat ? selectedCat.subcategories : [];
  }
  async function feachuseracees() {
    try {
      console.log("reached");
      const response = await axiosInstance.get(
        "/accesscontrol/getcategorydata"
      );
      setcategories(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    feachuseracees();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-4xl p-8 space-y-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-center mb-6">
          {authUser.role === "Head" ? "Head Admin Panel" : "Admin Panel"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <Label htmlFor="fullName">Enter the full name</Label>
                <Input
                  id="fullName"
                  type="text"
                  {...register("fullName", { required: "Name is required" })}
                  className="w-full"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <Label htmlFor="email">Enter Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* User ID */}
              <div>
                <Label htmlFor="userId">Enter User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  {...register("userId", { required: "User ID is required" })}
                  className="w-full"
                />
                {errors.userId && (
                  <p className="text-red-500">{errors.userId.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber">Enter Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  className="w-full"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Role Selection */}
              <div>
                <Label htmlFor="role">Select the role</Label>
                <Select
                  onValueChange={(value) => {
                    setRole(value);
                    setValue("role", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {authUser.role === "Head" ? (
                        <>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Staff">Staff</SelectItem>
                        </>
                      ) : (
                        <SelectItem value="Staff">Staff</SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-500">Role is required</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Set Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="w-full"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Branch Selection */}
              <div>
                <Label>Select Branch</Label>
                <Select
                  onValueChange={(value) => {
                    setBranch(value);
                    const updatedSubcategories = updatesubcatogary(value); // Use the new branch value
                    setsubcatogary(updatedSubcategories);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((branch, index) => {
                        return (
                          <SelectItem value={branch._id} key={index}>
                            {branch._id}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Department Access Selection */}
              <div>
                <Label htmlFor="department">Select Departments</Label>
                <Controller
                  name="department"
                  control={control}
                  defaultValue={[]}
                  rules={{ required: "Please select at least one department" }}
                  render={({ field }) => (
                    <div className="space-y-2">
                      {subcatogary && (
                        <div className="border rounded-md p-4 mt-2">
                          <div className="grid grid-cols-2 gap-4">
                            {subcatogary.map((department, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  value={department}
                                  checked={field.value.includes(department)}
                                  onCheckedChange={(checked) => {
                                    const updatedDepartments = checked
                                      ? [...field.value, department]
                                      : field.value.filter(
                                          (dep) => dep !== department
                                        );
                                    field.onChange(updatedDepartments);
                                  }}
                                />
                                <p>{department}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                />
                {errors.departments && (
                  <p className="text-red-500">{errors.departments.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit"}
          </Button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </Card>
    </div>
  );
}

export default CreateForm;
