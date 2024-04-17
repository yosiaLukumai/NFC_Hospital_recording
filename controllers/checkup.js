const createOutput = require("../utils").createOutput;
const checkUPmodel = require("../models/checkup")

const saveCheckUp = async (req, res) => {
    try {
        const { patientID, BloodType, temp } = req.body
        const saved = await checkUPmodel.create({
            patientID,
            BloodType,
            temp
        })
        if (saved) {
            return res.json(createOutput(true, saved));
        } else {
            return res.json(createOutput(false, saved));
        }
    } catch (error) {
        return res.json(createOutput(false, error?.message, true));
    }
}

const findLastCheckUP = async (req, res) => {
    try {
        const patientID = req.params.patientID
        let retrievedData = await checkUPmodel.findOne({ patientID }, null, { sort: { createdAt: -1 }, limit: 1 }).exec();
        if (retrievedData) {
            return res.json(createOutput(true, retrievedData));
        } else {
            return res.json(createOutput(false, retrievedData));
        }
    } catch (error) {
        return res.json(createOutput(false, error?.message, true));
    }
}


const allCheckups = async (req, res) => {
    try {
        const patientID = req.params.patientID
        const checkups = checkUPmodel.find({ patientID })
        if (checkups) {
            return res.json(createOutput(true, checkups));
        } else {
            return res.json(createOutput(false, checkups));
        }
    } catch (error) {
        return res.json(createOutput(false, error?.message, true));
    }
}

module.exports = {
    saveCheckUp,
    findLastCheckUP,
    allCheckups
}

