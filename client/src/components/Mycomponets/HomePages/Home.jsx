import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/Axiosinstance";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = useSelector((state) => state.auth.authUser);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/accesscontrol/getcategorydata");
      if (response.status === 200) {
        setCategories(response.data.data || []);
      } else {
        toast.error(response.data.message || "Error fetching categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("An error occurred while fetching categories.");
    }
  };

  useEffect(() => {
    if (user.role === "Head") {
      fetchCategories();
    } else {
      // Fetch categories based on the user's role and main category selection
      setCategories([user.branch]);  // Assuming user.branch is their main category
    }
  }, [user]);

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">
            Home Page - {user.role} Panel
          </h2>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Categories</Label>
            {user.role === "Head" ? (
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category._id}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <div className="mt-2">
                <p>{user.branch}</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <Label>Departments</Label>
            {categories.length === 0 ? (
              <p>No departments available.</p>
            ) : (
              categories.map((category) => (
                <div key={category._id} className="mt-4">
                  <h3>{category._id}</h3>
                  <ul>
                    {category.subcategories?.map((sub, index) => (
                      <li key={index}>{sub}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
