const wardModel = require("../models/ward")


const register = async (req, res) => {
    try {
        const { wardNumber, noBeds } = req.body;
        const saved = await wardModel.create({
            wardNumber,
            noBeds
        });
        if (saved) {
            return res.json(createOutput(true, "successful registered..."));

        } else {
            return res.json(createOutput(false, saved));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
};


const allBeds = async (req, res) => {
    try {
        const beds = await wardModel.find()
        if (beds) {
            return res.json(createOutput(true, beds));
        } else {
            return res.json(createOutput(false, beds));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
};


module.exports = {
    register,
    allBeds
}

