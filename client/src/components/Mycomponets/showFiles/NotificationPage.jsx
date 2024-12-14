import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import axios from 'axios';
import axiosInstance from '@/utils/Axiosinstance';
import { useSelector } from 'react-redux';

const NotificationCard = ({ notification }) => {
  return (
    <Card className="mb-4 hover:shadow-lg transition">
      <CardHeader className="flex items-center">
        <FaBell className="text-blue-500 text-xl mr-4" />
        <div>
          <CardTitle>{notification.title}</CardTitle>
          <CardDescription>{new Date(notification.createdAt).toLocaleString()}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{notification.filedetails?.message || "No message available."}</p>
      </CardContent>
    </Card>
  );
};

const NotificationView = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.authUser);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axiosInstance.get('/services/getallnotification', { params: { metamaskId: user.metamaskId } });
        setNotifications(data.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading notifications...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCard key={notification._id} notification={notification} />
        ))
      ) : (
        <p className="text-center text-gray-500">No notifications found.</p>
      )}
    </div>
  );
};

export default NotificationView;
