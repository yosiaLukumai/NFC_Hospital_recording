const dataModel = require("./../models/data");
const userModel = require("./../models/users");
const picModel = require("./../models/pics")
const createOutput = require("../utils").createOutput;
const io = require("./../index")
const serveData = async (req, res) => {
    try {
        // let { temp, hum, size, deviceId } = req.body;
        let { temp, hum, size } = req.body;
        // query the device id to get userId
        // check the type of the size of the plant
        temp = String(temp);
        hum = String(hum);
        size = String(size);

        

        // const found = await userModel.findOne({ deviceId: String(deviceId) });
        const found = await userModel.findOne({ deviceId: 1000 });
        if (found) {
            // save the data to the database
            const saved = await dataModel.create({ userId: found?._id, temp, hum, size });
            if (saved) {
                // fire a socket to notify there is new data...
                io.Socket.emit("newData", saved)
                return res.json({ status: 1, message: "Data saved sucessfully" })
            } else {
                return res.json({ status: 0, message: "Failed to save the data" })
            }
        } else {
            return res.json({ status: 0, message: "Device not registered..." })
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}


const serveGraphData = async (req, res) => {
    try {
        const deviceId = req.params.deviceId
        const found = await userModel.findOne({ deviceId: String(deviceId) });
        if (found) {
            const fiveLastData = await dataModel.find({userId: found?._id}, "temp hum size createdAt", { createdAt: -1 }).limit(6).exec();
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

        const id = req.params.id;
        const user = await userModel.findById(id);
        if (user) {
            // tries to retrieve the data
            let retrievedData = await dataModel.findOne({ userId: user._id }, null, { sort: { createdAt: -1 }, limit: 1 }).exec();;
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
        }else {
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
