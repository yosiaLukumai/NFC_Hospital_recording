const userModel = require("../models/users");
const createOutput = require("../utils").createOutput;
const doctorsNurse = require('../models/doctorNurse')
const utils = require("../utils");
const doctorNurse = require("../models/doctorNurse");
const login = async (req, res) => {
  try {
    // let connected = await dbConfig.reconnect();
    // console.log(connected);
    const { email, password } = req.body;
    // query a user from the database
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatched = await utils.comparePassword(
        password,
        user.password
      );
      if (passwordMatched) {
        // let look for the account information
        const otherDetails = await doctorNurse.findOne({ userId: user._id }, null, { sort: { createdAt: -1 }, limit: 1 }).exec();
        return res.json(createOutput(true, { user }));
      } else {
        return res.json(createOutput(false, "Incorrect Password"));
      }
    } else {
      return res.json(createOutput(false, user));
    }
  } catch (error) {
    console.log(error.message);
    return res.json(createOutput(false, error.message, true));
  }
};

const register = async (req, res) => {
  try {
    const { email, password, accountType, firstName, lastName, speciality } = req.body;
    const saved = await userModel.create({
      email,
      password,
      accountType
    });
    if (saved) {
      // saving the doctor or nurse type 

      const NewUserRef = {
        userID: saved?._id,
        firstName,
        lastName,
        speciality,
        onduty: false
      }

      const savedDN = await doctorNurse.create(NewUserRef)
      if (savedDN) {
        return res.json(createOutput(true, "successful registered..."));
      } else {
        return res.json(createOutput(true, "saved the userr but failed to save his/her speciality.."));
      }
    } else {
      return res.json(createOutput(false, saved));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};



const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json(createOutput(true, users));
  } catch (error) {
    return res.json(false, error.message, true);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // querying the user in the database
    const user = await userModel.findById(id);
    const { password, email, username } = req.body;
    if (user) {
      const updated = await userModel.updateOne(
        { email: user.email },
        { password, email, username }
      );
      if (updated) {
        return res.json(createOutput(true, updated));
      } else {
        return res.json(createOutput(true, "failed to update the user"));
      }
    }
    return res.json(createOutput(false, "failed to get user with given id"));
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const countUsers = async (req, res) => {
  try {
    const allUsersCount = await userModel.find().count();
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

const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const deleted = await userModel.deleteOne({ email });
    if (deleted) {
      return res.json(createOutput(true, deleted));
    } else {
      return res.json(createOutput(false, deleted));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};




const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
      return res.json(createOutput(true, user));
    } else {
      return res.json(createOutput(true, "No such user"));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};





module.exports = {
  allUsers,
  login,
  deleteUser,
  updateUser,
  register,
  getUserById,
  countUsers,
};
