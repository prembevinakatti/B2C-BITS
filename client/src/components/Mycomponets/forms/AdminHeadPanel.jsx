import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/Axiosinstance";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Assuming you have a Loader component in the UI folder
import Loader from "@/components/ui/loader"; // Adjust the path as per your project structure

const AdminHeadPanel = () => {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [fetchedMainCategories, setFetchedMainCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("input");
  const [loading, setLoading] = useState(false); // Add loading state
  const user = useSelector((state) => state.auth.authUser);

  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, ""]);
  };

  const handleSubCategoryChange = (index, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = value;
    setSubCategories(updatedSubCategories);
  };

  const handleRemoveSubCategory = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
  };

  const handleSubmit = async () => {
    if (!mainCategory || subCategories.some((subcat) => !subcat.trim())) {
      return toast.error("Please fill out all fields.");
    }

    const data = {
      toUpdate: activeTab === "input" ? "maincategory" : "subcategory",
      data: {
        _id: mainCategory,
        Subcategories: subCategories,
      },
    };

    setLoading(true); // Show loader when submission starts

    try {
      console.log("code reached here");
      const response = await axiosInstance.post(
        "/accesscontrol/updatecatogory",
        data
      );
      if (response.status === 201) {
        toast.success("Main category and subcategories updated successfully.");
        setMainCategory("");
        setSubCategories([""]);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating categories.");
    } finally {
      setLoading(false); // Hide loader when the process is complete
    }
  };

  const fetchAllMainCategories = async () => {
    setLoading(true); // Show loader while fetching data
    try {
      const response = await axiosInstance.get(
        "/accesscontrol/getcategorydata"
      );
      setFetchedMainCategories(response.data.data || []);
    } catch (error) {
      console.error("Error fetching main categories:", error);
    } finally {
      setLoading(false); // Hide loader after fetching is complete
    }
  };

  useEffect(() => {
    if (user.role === "Head") {
      fetchAllMainCategories();
    }
  }, [user.role]);

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">
            {user.role === "Head"
              ? "Head Control Panel"
              : "Admin Control Panel"}
          </h2>
        </CardHeader>
        <CardContent>
          {/* Loader appears during fetching or submitting */}
          {loading && <Loader />}

          {user.role === "Head" && (
            <div>
              <Label htmlFor="mainCategory">Main Category</Label>
              <Tabs
                defaultValue="input"
                onValueChange={(value) => setActiveTab(value)}
              >
                <TabsList className="mt-2">
                  <TabsTrigger value="drop">Select from Existing</TabsTrigger>
                  <TabsTrigger value="input">Create New</TabsTrigger>
                </TabsList>
                <TabsContent value="drop">
                  {fetchedMainCategories.length === 0 ? (
                    <p>No existing categories found. Please create one.</p>
                  ) : (
                    <Select onValueChange={(value) => setMainCategory(value)}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {fetchedMainCategories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category._id}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </TabsContent>
                <TabsContent value="input">
                  <Input
                    id="mainCategory"
                    placeholder="Enter main category"
                    className="mt-2"
                    value={mainCategory}
                    onChange={(e) => setMainCategory(e.target.value)}
                  />
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Label>Subcategories</Label>
                {subCategories.map((subCategory, index) => (
                  <div className="flex items-center gap-4 mt-2" key={index}>
                    <Input
                      placeholder={`Subcategory ${index + 1}`}
                      value={subCategory}
                      onChange={(e) =>
                        handleSubCategoryChange(index, e.target.value)
                      }
                    />
                    <Button onClick={() => handleRemoveSubCategory(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button className="mt-4" onClick={handleAddSubCategory}>
                  + Add Subcategory
                </Button>
              </div>
            </div>
          )}

          {user.role !== "Head" && (
            <div>
              <Label>Main Category</Label>
              <Input value={user.branch} disabled className="mt-2" />
              <div className="mt-6">
                <Label>Subcategories</Label>
                {subCategories.map((subCategory, index) => (
                  <div className="flex items-center gap-4 mt-2" key={index}>
                    <Input
                      placeholder={`Subcategory ${index + 1}`}
                      value={subCategory}
                      onChange={(e) =>
                        handleSubCategoryChange(index, e.target.value)
                      }
                    />
                    <Button onClick={() => handleRemoveSubCategory(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button className="mt-4" onClick={handleAddSubCategory}>
                  + Add Subcategory
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminHeadPanel;
