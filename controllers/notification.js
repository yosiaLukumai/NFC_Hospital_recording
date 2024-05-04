const notification = require("../models/notification");

const getUnReadNotification = async (userID) => {
    try {
        const data = await notification.find({ TargettedUser: userID, received: false })
        if (data) {
            return { error: false, notification: data }
        } else {
            return { error: false, notification: [] }
        }
    } catch (error) {
        console.log("Error in retriving last notification:  ", error);
        return { error: true, notification: [] }
    }
}


module.exports = {
    getUnReadNotification
};
