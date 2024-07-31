const db = require("./db");

exports.getNotifications = async (req, res) => {
    // console.log("notifications fetched");
    const notifications = await db.findNotificationsForUser(req.params.user);
    if (notifications != undefined) {
      res.status(200).json(notifications);
    } else {
      res.status(404).send();
    }
};

// updates the offer of the corresponding notification
exports.updateNotificationRead = async (req, res) => {
  const updateResult = await db.updateOffer_JSONSeenKeyToTrue(req.params.offer_id);
  if (updateResult != undefined) {
    res.status(200).json(updateResult);
  } else {
    res.status(404).send();
  }
}