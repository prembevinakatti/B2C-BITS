const admin = require('firebase-admin');

module.exports.pushnotification = async ({ fcmTokens, notificationData }) => {
  const message = {
    tokens: fcmTokens, // Tokens array at the top level
    notification: {
      title: notificationData.title,
      body: notificationData.body,
    },
    data: notificationData.data || {}, // Custom data (optional)
    webpush: {
      fcmOptions: {
        link: notificationData.clickAction || 'https://example.com',
      },
    },
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message); // Correct method
    console.log("Notifications sent successfully:", response);
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};
