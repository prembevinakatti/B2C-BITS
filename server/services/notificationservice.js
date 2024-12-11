const admin = require('firebase-admin');
module.exports.pushnotification = async ({ fcmTokens, notificationData }) => {
  const message = {
    tokens: fcmTokens,
    notification: {
      title: notificationData.title,
      body: notificationData.body,
    },
    data: notificationData.data || {}, 
    webpush: {
      notification: {
        click_action: notificationData.clickAction || 'https://example.com',
      },
    },
  };
  try {
    const response = await admin.messaging().sendEachForMulticast(message)
    console.log("Notifications sent successfully:", response);
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};
