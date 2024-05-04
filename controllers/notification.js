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

const DeleteReadNotification = async (id) => {
    try {
        const data = await notification.updateOne({ _id: id },
            { received: true })
        if (data) {
            return { error: false, notification: data }
        } else {
            return { error: false, notification: [] }
        }
    } catch (error) {
        console.log("Error in ensuring the notication is deleted ", error);
        return { error: true, notification: [] }
    }
}


module.exports = {
    getUnReadNotification,
    DeleteReadNotification
};
