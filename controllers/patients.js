const createOutput = require("../utils").createOutput;
const patientModel = require("../models/patients")
const notification = require("../models/notification")
const io = require("../index")

const register = async (req, res) => {
  try {
    const { email, firstName, lastName, wardNumber, age, cardID, doctorId, nurseID } = req.body;
    const findPatient = await patientModel.findOne({ cardID })
    if (!findPatient) {
      const saved = await patientModel.create({
        email,
        cardID,
        firstName,
        lastName,
        wardNumber,
        age,
        nurseID,
        doctorId
      });
      if (saved) {
        const savedNurseNotification = await notification.create({
          TargettedUser: nurseID,
          cardID,
          msg: `Assigned new Patient with name ${firstName}-${lastName}`,
          received: false
        })

        const savedDoctorotification = await notification.create({
          TargettedUser: doctorId,
          cardID,
          msg: `Assigned new Patient with name ${firstName}-${lastName}`,
          received: false
        })
        if (savedDoctorotification) {
          io.Socket.emit("notification", {
            idUser: doctorId,
            data: savedDoctorotification
          })
        }
        if (savedNurseNotification) {
          io.Socket.emit("notification", {
            idUser: nurseID,
            data: savedDoctorotification
          })
        }
        return res.json(createOutput(true, saved));
      } else {
        return res.json(createOutput(false, "failed to save the user"));
      }
    } else {
      return res.json(createOutput(false, "Card ID already registered.."));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};



const allPatients = async (req, res) => {
  try {
    const users = await patientModel.find();
    return res.json(createOutput(true, users));
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // querying the user in the database
    const user = await patientModel.findById(id);
    const { email, firstName, lastName, age, cardID } = req.body;
    if (user) {
      const updated = await patientModel.updateOne(
        { email: user.email },
        { email, firstName, lastName, age, cardID }
      );
      if (updated) {
        return res.json(createOutput(true, updated));
      } else {
        return res.json(createOutput(false, "failed to update the patient"));
      }
    }
    return res.json(createOutput(false, "failed to get user with given id"));
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const countPatients = async (req, res) => {
  try {
    const allUsersCount = await patientModel.find().count();
    if (allUsersCount) {
      return res.json(createOutput(true, allUsersCount));
    } else {
      return res.json(createOutput(false, allUsersCount));
    }
  } catch (error) {
    console.log(error.message);
    return res.json(createOutput(false, error.message, true));
  }
};

const deletePatient = async (req, res) => {
  try {
    const cardID = req.params.cardID;
    const deleted = await patientModel.deleteOne({ cardID });
    if (deleted) {
      return res.json(createOutput(true, deleted));
    } else {
      return res.json(createOutput(false, deleted));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};




const getPatientById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await patientModel.findById(id);
    if (user) {
      return res.json(createOutput(true, user));
    } else {
      return res.json(createOutput(false, "No such Patient"));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};





module.exports = {
  allPatients,
  deletePatient,
  updateUser,
  register,
  getPatientById,
  countPatients,
};
