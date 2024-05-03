const dataModel = require("./../models/data");
const userModel = require("./../models/users");
const patientModel = require("../models/patients")
const createOutput = require("../utils").createOutput;
const io = require("./../index")
const NotificationModel = require("../models/notification")
const serveData = async (req, res) => {
    try {
        // let { temp, hum, size, deviceId } = req.body;
        let { emergency, cardID } = req.body;

        const found = await patientModel.findOne({ cardID });
        if (found) {
            const saved = await dataModel.create({ cardID, emergency });
            if (saved) {
                // emit the notification 
                // fire a socket to notify there is new data...
                // io.Socket.emit("newData", saved)
                const savedNotification = await NotificationModel.create({
                    TargettedUser: found?.nurseID,
                    cardID,
                    msg: `Patient: ${found?.firstName} - ${found?.lastName} at Ward No: ${found?.wardNumber} Has problem please check him/her`,
                    received: false
                })
                if(savedNotification) {
                    io.Socket.emit("notification", {
                        idUser: found?.nurseID,
                        data: savedNotification
                    })
                }
                return res.json({ status: 1, message: "Data saved sucessfully" })
            } else {
                return res.json({ status: 0, message: "Failed to save the data" })
            }
        } else {
            return res.json({ status: 0, message: "Card not registered..." })
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}


const serveGraphData = async (req, res) => {
    try {
        const deviceId = req.params.deviceId
        const patient = await userModel.findOne({ deviceId: String(deviceId) });
        if (patient) {
            const fiveLastData = await dataModel.find({ userId: found?._id }, "temp hum size createdAt", { createdAt: -1 }).limit(6).exec();
            return res.json(createOutput(true, fiveLastData))
        } else {
            return res.json({ status: 0, message: "Device not registered..." })
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}

const fetchDataLogs = async (req, res) => {
    try {
        console.log("fetching logs....");
        let parameter = req.params.parameter
        let userId = req.params.id
        console.log(parameter);
        let user = await userModel.findById(userId)
        if (user) {
            // checking if the parameter is of what type
            if (parameter == "Temperature") {
                const data = await dataModel.find({ userId }, "temp createdAt", { sort: { createdAt: -1 } }).exec();
                return res.json(createOutput(true, data))
            }
            if (parameter == "Humidity") {
                const data = await dataModel.find({ userId }, "hum createdAt", { sort: { createdAt: -1 } }).exec();
                return res.json(createOutput(true, data))
            }
            if (parameter == "size") {
                const data = await dataModel.find({ userId }, "size createdAt", { sort: { createdAt: -1 } }).exec();
                return res.json(createOutput(true, data))
            }
        } else {
            return res.json(createOutput(true, "No such user", true));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}

const FindLastData = async (req, res) => {
    try {

        const cardID = req.params.cardID;
        const user = await patientModel.find({ cardID });
        if (user) {
            // tries to retrieve the data
            let retrievedData = await dataModel.findOne({ userId: user._id }, null, { sort: { createdAt: -1 }, limit: 1 }).exec();
            if (retrievedData) {
                return res.json(createOutput(true, retrievedData))
            } else {
                return res.json(createOutput(true, "Can't retrieve the data"))
            }

        } else {
            return res.json(createOutput(false, "No such user Data", true));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}

const SaveImages = async (req, res) => {
    try {

        const deviceId = req.params.deviceId;
        const found = await userModel.findOne({ deviceId: String(deviceId) });
        if (found) {
            // 
        } else {
            return res.json(createOutput(false, "No such device Id", true));
        }


    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}

module.exports = {
    serveData,
    FindLastData,
    fetchDataLogs,
    serveGraphData,
    SaveImages
}
