import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
 
  
} from "@/components/ui/tabs"; // Replace with your ShadCN imports
import { Card,
    CardHeader,
    CardContent,
    CardFooter}from "@/components/ui/card"
    
import {Button}from "@/components/ui/button"
import {Skeleton}from "@/components/ui/skeleton"
import axiosInstance from "@/utils/Axiosinstance";
import { useSelector } from "react-redux";


const RequestCard = ({ request, onAction }) => (
  <Card className="mb-4">
    <CardHeader>
      <h4 className="text-lg font-semibold">{request.description}</h4>
    </CardHeader>
    <CardContent>
      <p>Type: {request.typeofrequest}</p>
      <p>To: {request.to}</p>
      <p>File ID: {request.fileId || "N/A"}</p>
    </CardContent>
    {onAction && (
      <CardFooter className="flex justify-end gap-2">
        <Button
          onClick={() => onAction(request._id, "approved")}
          variant="success"
        >
          Accept
        </Button>
        <Button
          onClick={() => onAction(request._id, "rejected")}
          variant="destructive"
        >
          Reject
        </Button>
      </CardFooter>
    )}
  </Card>
);

const SkeletonLoader = () => (
  <div>
    {[1, 2, 3,4,5].map((_, index) => (
      <Skeleton key={index} className="h-24 w-full mb-4" />
    ))}
  </div>
);

const RequestViewPage = () => {
  const [tab, setTab] = useState("pending");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.authUser);
  // Fetch requests based on the selected tab
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/services/requests?status=${tab}id=${user.id}`);
      setRequests(response.data.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle action (Accept/Reject)
  const handleRequestAction = async (id, action) => {
    try {
        if(action=="Accept"){
            await axiosInstance.post(`/accesscontrol/viewconform`,{requestId:id})
        }
        else{
            await axiosInstance.post(`/accesscontrol/viewconform`,{requestId:id})
        }
      fetchRequests(); // Refresh the data
    } catch (error) {
      console.error(`Failed to ${action} request:`, error);
    }
  };

  // Fetch requests whenever the tab changes
  useEffect(() => {
    fetchRequests();
  }, [tab]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Request Management</h1>
      <Tabs defaultValue="pending" onValueChange={(value) => setTab(value)}>
        <TabsList>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="approved">Approved Requests</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {loading ? (
            <SkeletonLoader />
          ) : (
            requests.map((req) => (
              <RequestCard
                key={req._id}
                request={req}
                onAction={handleRequestAction} // Buttons are displayed
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="approved">
          {loading ? (
            <SkeletonLoader />
          ) : (
            requests.map((req) => (
              <RequestCard key={req._id} request={req} /> // No buttons
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected">
          {loading ? (
            <SkeletonLoader />
          ) : (
            requests.map((req) => (
              <RequestCard key={req._id} request={req} /> // No buttons
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestViewPage;
